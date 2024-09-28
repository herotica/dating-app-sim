import { usePlayerStore } from '../stores/player.store';

export default function SkipOrMatch({ canInteract = true, onComplete, girl }) {
  const matchWithGirl = usePlayerStore(S => S.matchWithGirl);
  const skipGirl = usePlayerStore(S => S.skipGirl);
  const removeSkippedGirl = usePlayerStore(S => S.removeSkippedGirl);
  const likedInteractionGirlsSkippedIDs = usePlayerStore(
    s => s.likedInteractionGirlsSkippedIDs
  );

  function match() {
    matchWithGirl(girl);
    onComplete();

    const likedInteractionGirlsSkippedIDsIndex =
      likedInteractionGirlsSkippedIDs.findIndex(
        girlInfo => girlInfo.id === girl.apiID
      );
    if (likedInteractionGirlsSkippedIDsIndex !== -1) {
      removeSkippedGirl(likedInteractionGirlsSkippedIDsIndex);
    }
  }

  function skip() {
    skipGirl(girl);
    onComplete();
  }

  if (!girl) {
    return <></>;
  }

  return (
    <div className="flex justify-center gap-4 p-4">
      <button
        onClick={skip}
        disabled={!canInteract}
        className="rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-400 disabled:opacity-40"
      >
        ❌
      </button>
      <button
        onClick={match}
        disabled={!canInteract}
        className="rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-400 disabled:opacity-40"
      >
        ✔
      </button>
    </div>
  );
}
