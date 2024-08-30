import MobileLayout from '../components/mobile-layout';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useGirlsStore } from '../stores/girls.store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/profile';
import Header from '../components/header';

export default function ViewProfile() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [girl, setGirlInfo] = useState(null);
  const girlID = searchParams.get('girlID');
  const getGirlData = useGirlsStore(s => s.getGirlData);

  useEffect(() => {
    async function updateGirlInfo() {
      const girlInfoData = await getGirlData(girlID);
      setGirlInfo(girlInfoData);
    }
    updateGirlInfo();
  }, [girlID]);

  return (
    <MobileLayout>
      <div>
        <Header
          Left={
            <button
              onClick={() => navigate(-1)}
              className="transition-opacity hover:opacity-75"
            >
              ⬅ Back
            </button>
          }
        />

        <main className="max-h-[60vh] flex-1 overflow-hidden">
          {girl && <Profile girl={girl} />}
        </main>
      </div>
    </MobileLayout>
  );
}
