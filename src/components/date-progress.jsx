import { NavLink } from 'react-router-dom';

export function DateProgress({ girlInfo, playerPoints, girlID }) {
  const sortedDates = girlInfo.dates.sort(
    (a, b) => a.pointsRequired - b.pointsRequired
  );

  let lastDatePoints = 0;
  const jsxArray = [];
  for (let index = 0; index < sortedDates.length; index++) {
    const date = sortedDates[index];
    const difference = date.pointsRequired - lastDatePoints; // 2-0 4-0, 2-2 4-2, 2-4 4-4

    const percentTillComplete =
      playerPoints >= date.pointsRequired
        ? 100
        : ((playerPoints - lastDatePoints) / difference) * 100;
    jsxArray.push(
      <div
        key={index + date.icon}
        className="relative h-2 min-w-8 flex-1 overflow-hidden rounded-full bg-slate-500"
      >
        <div
          style={{ width: `${percentTillComplete}%` }}
          className="absolute left-0 h-full bg-green-500"
        />
      </div>
    );
    jsxArray.push(
      <div key={date.icon} className={`relative right-1.5 z-10 h-6 w-3`}>
        <div className="h-6 min-w-6 overflow-hidden rounded-full bg-slate-200">
          <NavLink
            to={`/date?girlID=${encodeURIComponent(girlID)}&dateID=${
              date.unlockKey
            }`}
            disabled={playerPoints < date.pointsRequired}
            className="flex h-full w-full items-center justify-center bg-sky-500 p-1 text-xs leading-none disabled:opacity-50"
          >
            {date.icon}
          </NavLink>
        </div>
      </div>
    );
    lastDatePoints = date.pointsRequired;
  }

  return <div className="flex flex-wrap items-center">{jsxArray}</div>;
}
