import { useState } from 'react';
import MobileLayout from '../components/mobile-layout';
import { useGirlsStore } from '../stores/girls.store';
import { NavLink } from 'react-router-dom';
import { usePlayerStore } from '../stores/player.store';
import Profile from '../components/profile';

export default function SwipePage() {
  const girlsData = useGirlsStore(s => s.girlsData);
  const getAnotherGirl = useGirlsStore(S => S.getAnotherGirl);
  const girlSeen = useGirlsStore(S => S.girlSeen);
  const girl = girlsData[0];
  const matchWithGirl = usePlayerStore(S => S.matchWithGirl);
  const skipGirl = usePlayerStore(S => S.skipGirl);

  function next() {
    getAnotherGirl();
    girlSeen();
  }

  function match() {
    matchWithGirl(girl);
    next();
  }

  function skip() {
    skipGirl(girl);
    next();
  }

  return (
    <MobileLayout>
      <div className="flex w-full flex-col">
        <header className="flex justify-between p-2">
          <NavLink
            to={'/profile'}
            className="transition-opacity hover:opacity-75"
          >
            🧔
          </NavLink>
          <NavLink
            to={'/matches'}
            className="transition-opacity hover:opacity-75"
          >
            💬
          </NavLink>
        </header>

        {girl && (
          <main className="flex max-h-[60vh] flex-1 flex-col overflow-hidden">
            <Profile girl={girl} />

            <div className="flex justify-center gap-4 p-4">
              <button
                onClick={skip}
                className="rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-400"
              >
                ❌
              </button>
              <button
                onClick={match}
                className="rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-400"
              >
                ✔
              </button>
            </div>
          </main>
        )}

        {!girl && (
          <div className="flex h-[60vh] flex-col items-center justify-center">
            {' '}
            No More Matches.. 🙁
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
