import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="rounded-2xl bg-slate-900 px-8 py-16 text-white">
      <p className="mb-3 font-medium text-blue-400">React 19 E Commerce</p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
        Everything you need in one place
      </h1>
      <p className="mt-5 max-w-xl text-lg text-slate-300 ">
        Explore products across electronics, fashion, beauty, furniture and
        more.
      </p>
      <Link
        to="/products"
        className="mt-8 inline-block rounded-lg bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
      >
        Shop now
      </Link>
    </section>
  );
}
export default HomePage;
