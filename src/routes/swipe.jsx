import { useState } from 'react';
import MobileLayout from '../components/mobile-layout';
import { useGirlsStore } from '../stores/girls.store';
import { NavLink } from 'react-router-dom';
import Profile from '../components/profile';
import Header from '../components/header';
import SkipOrMatch from '../components/skip-or-match';

export default function SwipePage() {
  const girlsData = useGirlsStore(s => s.girlsData);
  const getAnotherGirl = useGirlsStore(S => S.getAnotherGirl);
  const girlSeen = useGirlsStore(S => S.girlSeen);
  const girl = girlsData[0];

  const [canInteract, setCanInteract] = useState(true);

  function next() {
    setCanInteract(false);
    getAnotherGirl();
    girlSeen();

    setTimeout(() => setCanInteract(true), 600);
  }


  return (
    <MobileLayout>
      <div className="flex w-full flex-col">
        <Header
          Left={
            <NavLink
              to={'/profile'}
              className="transition-opacity hover:opacity-75"
            >
              🧔
            </NavLink>
          }
        />

        {girl && (
          <main className="flex max-h-[60vh] flex-1 flex-col overflow-hidden">
            <Profile girl={girl} />

            <SkipOrMatch canInteract={canInteract} onComplete={next} girl={girl} />

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
