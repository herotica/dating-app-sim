import MobileLayout from '../components/mobile-layout';
import { NavLink } from 'react-router-dom';
import { usePlayerStore } from '../stores/player.store';

export default function MatchesPage() {
  const likedInteractionGirlInfo = usePlayerStore(
    s => s.likedInteractionGirlInfo
  );
  const missedMatches = usePlayerStore(s => s.missedMatches);
  console.log('likedInteractionGirlInfo', likedInteractionGirlInfo);

  return (
    <MobileLayout>
      <div className="flex w-full flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex justify-between p-2">
            <NavLink to={'/'} className="transition-opacity hover:opacity-75">
              ❤
            </NavLink>
            <NavLink
              to={'/profile'}
              className="transition-opacity hover:opacity-75"
            >
              🧔
            </NavLink>
          </div>

          <div className="mx-4 flex items-center gap-2 rounded-full bg-slate-400 px-2 py-1">
            <span>🔎</span>

            <input
              className="bg-transparent placeholder:text-slate-800"
              placeholder="Search Matches"
            />
          </div>
        </header>

        <main className="thin-scroll flex h-[60vh] max-h-[60vh] flex-col gap-4 overflow-y-scroll">
          <h2 className="pl-4 text-red-700">Messages</h2>

          <div className="flex flex-col gap-4">
            {likedInteractionGirlInfo.map(matchInfo => (
              <NavLink to={`/chat?id=${matchInfo.apiID}`} key={matchInfo.username} className="mx-4 flex gap-4 items-center">
                <div className="overflow-hidden rounded-full h-16 w-16">
                  <img className='w-full h-full object-cover' src={`/prof-pics/${matchInfo.icon}`} />
                </div>
                <div className='flex flex-col items-start gap-1 text-sm'>
                    <h3>{matchInfo.username}</h3>
                    <p className='text-xs text-slate-600'>{matchInfo.lastMessage}</p>
                </div>
              </NavLink>
            ))}
          </div>

          <span className="pl-4 text-xs text-slate-600">
            {' '}
            Missed Matches: {missedMatches}
          </span>
        </main>
      </div>
    </MobileLayout>
  );
}
