export default function MobileLayout({children}) {
  return (
    <div className="h-screen w-full flex-1 flex flex-col items-center justify-center bg-slate-100">
      <div className="max-h-[80vh] max-w-sm w-full bg-white">{children}</div>
    </div>
  );
}
