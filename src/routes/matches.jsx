import MobileLayout from '../components/mobile-layout';
import { NavLink } from 'react-router-dom';
import { usePlayerStore } from '../stores/player.store';
import { useState } from 'react';
import Header from '../components/header';

export default function MatchesPage() {
  const [search, setSearch] = useState('');

  const likedInteractionGirlInfo = usePlayerStore(
    s => s.likedInteractionGirlInfo
  );
  const fillerMatches = usePlayerStore(s => s.fillerMatches);
  const fillersSkipped = usePlayerStore(s => s.fillersSkipped);
  const likedInteractionGirlsSkippedIDs = usePlayerStore(
    s => s.likedInteractionGirlsSkippedIDs
  );

  const filteredMatchesBySearch = likedInteractionGirlInfo.filter(girl =>
    `${girl.username}${girl.apiID}`
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
  );

  return (
    <MobileLayout>
      <div className="flex w-full flex-col gap-4">
        <Header
          Right={
            <NavLink
              to={'/profile'}
              className="transition-opacity hover:opacity-75"
            >
              🧔
            </NavLink>
          }
        />
        <div className="mx-4 flex items-center gap-2 rounded-full bg-slate-400 px-2 py-1">
          <span>🔎</span>

          <input
            className="bg-transparent placeholder:text-slate-800"
            placeholder="Search Matches"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <main className="thin-scroll flex h-[60vh] max-h-[60vh] flex-col gap-4 overflow-y-scroll">
          <h2 className="pl-4 text-red-700">Messages</h2>

          <div className="flex flex-col gap-4">
            {filteredMatchesBySearch.map(matchInfo => (
              <NavLink
                to={`/chat?girlID=${matchInfo.apiID}&source=${encodeURIComponent(matchInfo.apiSource)}`}
                key={matchInfo.username}
                className="mx-4 flex items-center gap-4"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover"
                    src={`${matchInfo.apiSource}/prof-pics/${matchInfo.icon}`}
                  />
                </div>
                <div className="flex flex-col items-start gap-1 text-sm">
                  <h3>{matchInfo.username}</h3>
                  <p className="text-xs text-slate-600">
                    {matchInfo.lastMessage}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>

          <span className="flex flex-wrap gap-2 pl-4 text-xs text-slate-600">
            <span>
              <b className="pr-2">Fillers Like</b>
              {fillerMatches}
            </span>
            <span>
              <b className="pr-2">Fillers Skipped</b>
              {fillersSkipped}
            </span>
            <span>
              <b className="pr-2">Missed Interactive Matches:</b>
              {likedInteractionGirlsSkippedIDs?.map(apiID => (
                <span>{apiID}</span>
              ))}
            </span>
          </span>
        </main>
      </div>
    </MobileLayout>
  );
}
