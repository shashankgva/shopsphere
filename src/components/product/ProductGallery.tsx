import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        No image available.
      </div>
    );
  }

  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white p-8">
      <img
        src={selectedImage}
        alt={title}
        className="w-full h-full object-contain"
      />
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => {
            const isSelected = selectedImage === image;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`View ${title} image ${index + 1}`}
                className={`aspect-square overflow-hidden rounded-xl border bg-white p-2 transition ${isSelected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-400'}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default ProductGallery;
