import { useGirlsStore } from '../stores/girls.store';

export default function EnlargeableImage({
  imageURL,
  source,
  imageClassname = 'max-h-44 rounded-lg'
}) {
  const setLightboxImage = useGirlsStore.getState().setLightboxImage;
  const imgURLChecked =
    imageURL.substring(0, 4) === 'http'
      ? imageURL
      : `${source}/chat-pics/${imageURL}`;

  return (
    <div className="relative">
      <button
        className="absolute right-1 top-1 rounded-full bg-black p-0.5 text-sm opacity-40"
        onClick={() => setLightboxImage(imgURLChecked)}
      >
        🔍
      </button>
      <img src={imgURLChecked} className={imageClassname} />
    </div>
  );
}
