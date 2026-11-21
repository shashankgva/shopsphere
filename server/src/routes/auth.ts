import { Router } from 'express';
import * as z from 'zod';
import argon2 from 'argon2';
import { rateLimit } from 'express-rate-limit';
import { userModel } from '../models/User.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const RegisterSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  password: z.string().min(12).max(128),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(128),
});

function regenerateSession(
  req: Parameters<Parameters<typeof router.post>[1]>[0],
): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error?: unknown) => {
      if (error) reject(error);
      resolve();
    });
  });
}

function saveSession(
  req: Parameters<Parameters<typeof router.post>[1]>[0],
): Promise<void> {
  return new Promise((resolve, reject) => {
    req.session.save((error?: unknown) => {
      if (error) reject(error);
      resolve();
    });
  });
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const validation = RegisterSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: 'Invalid registration details.',
        issues: validation.error.issues,
      });

      return;
    }

    const { name, password } = validation.data;
    const email = validation.data.email.trim().toLowerCase();

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    let user;

    try {
      user = await userModel.create({ name, email, passwordHash });
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        res
          .status(409)
          .json({ message: 'An account with this email already exists.' });
      }

      throw error;
    }

    // Create new session after successful registration
    await regenerateSession(req);

    req.session.userId = user._id.toString();
    await saveSession(req);

    res.status(201).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const validation = LoginSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        message: 'Invalid login details.',
      });

      return;
    }

    const { password } = validation.data;
    const email = validation.data.email.trim().toLowerCase();

    const user = await userModel.findOne({ email }).select('+passwordHash');

    const passwordMatches = user
      ? await argon2.verify(user.passwordHash, password)
      : false;

    if (!user || !passwordMatches) {
      res.status(401).json({
        message: 'Invalid email or password.',
      });

      return;
    }

    // Regenerate session ID after authentication
    await regenerateSession(req);

    req.session.userId = user._id.toString();

    await saveSession(req);

    res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get('/me', async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({
        message: 'Not authenticated.',
      });

      return;
    }

    const user = await userModel.findById(userId);

    if (!user) {
      res.status(401).json({
        message: 'Not authenticated.',
      });

      return;
    }

    res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res, next) => {
  try {
    req.session.destroy((error?: unknown) => {
      if (error) {
        next(error);
        return;
      }

      const isProduction = process.env.NODE_ENV === 'production';

      res.clearCookie('shopsphere.sid', {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
      });

      res.status(200).json({
        message: 'Logged out successfully.',
      });
    });
  } catch (error) {
    next(error);
  }
});

export default router;
