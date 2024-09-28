import MobileLayout from '../components/mobile-layout';
import { useSearchParams } from 'react-router-dom';
import { useGirlsStore } from '../stores/girls.store';
import { usePlayerStore } from '../stores/player.store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/profile';
import Header from '../components/header';
import SkipOrMatch from '../components/skip-or-match';

export default function ViewProfile() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [girl, setGirlInfo] = useState(null);
  const girlID = searchParams.get('girlID');
  const source = searchParams.get('source');
  const getGirlData = useGirlsStore(s => s.getGirlData);

  const likedInteractionGirlsSkippedIDs = usePlayerStore(
    s => s.likedInteractionGirlsSkippedIDs
  );
  const isMissedOpportunity = !!likedInteractionGirlsSkippedIDs.find(
    girlInfo => girlInfo.id === girlID
  );

  useEffect(() => {
    async function updateGirlInfo() {
      if (!!source && !!girlID) {
        const girlInfoData = await getGirlData(source, girlID);
        setGirlInfo(girlInfoData);
      }
    }
    updateGirlInfo();
  }, [girlID, source]);

  function back() {
    navigate(-1);
  }

  return (
    <MobileLayout>
      <div>
        <Header
          Left={
            <button
              onClick={back}
              className="transition-opacity hover:opacity-75"
            >
              ⬅ Back
            </button>
          }
        />

        <main className="max-h-[60vh] flex-1 overflow-hidden">
          {!!girl && <Profile girl={girl} />}

          {!!girl && isMissedOpportunity && (
            <SkipOrMatch canInteract onComplete={back} girl={girl} />
          )}
        </main>
      </div>
    </MobileLayout>
  );
}
