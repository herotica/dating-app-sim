import { NavLink } from 'react-router-dom';

export default function Header({ Left, Right }) {
  return (
    <header className="flex justify-between p-2">
      {!!Left ? (
        Left
      ) : (
        <NavLink to={'/'} className="transition-opacity hover:opacity-75">
          ❤
        </NavLink>
      )}

      <div className="flex gap-4">
        <NavLink to={'/help'} className="transition-opacity hover:opacity-75">
          ❔
        </NavLink>
        {!!Right ? (
          Right
        ) : (
          <NavLink
            to={'/matches'}
            className="transition-opacity hover:opacity-75"
          >
            💬
          </NavLink>
        )}
      </div>
    </header>
  );
}
