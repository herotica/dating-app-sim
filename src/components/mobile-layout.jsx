import Lightbox from './lightbox';

export default function MobileLayout({ children }) {
  return (
    <Lightbox>
      <div className="flex h-screen w-full flex-1 flex-col items-center justify-center bg-slate-100">
        <div className="max-h-[80vh] w-full max-w-sm bg-white">{children}</div>
      </div>
    </Lightbox>
  );
}
