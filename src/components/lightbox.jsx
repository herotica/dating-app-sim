import { useGirlsStore } from '../stores/girls.store';

export default function Lightbox({ children }) {
  const lightboxImage = useGirlsStore(s => s.lightboxImage);
  const unsetLightboxImage = useGirlsStore(s => s.unsetLightboxImage);

  return (
    <div className="relative">
      {children}

      {!!lightboxImage && (
        <div
          className="absolute bottom-0 left-0 right-0 top-0 p-8 z-50 max-h-[100vh]"
          onClick={() => unsetLightboxImage()}
        >
          <div
            className="rounded-2xl relative bg-black/60 p-8 h-full"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <button onClick={() => unsetLightboxImage()} className="absolute right-4 top-4 rounded-full p-4 opacity-40 bg-black">
              ❌
            </button>
            <img src={lightboxImage} className="h-full w-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
