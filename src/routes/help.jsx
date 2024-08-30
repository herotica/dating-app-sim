import MobileLayout from '../components/mobile-layout';
import { NavLink } from 'react-router-dom';

export default function HelpPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2 p-4">
          <h2 className="mb-6 font-bold">Routes</h2>
          <NavLink to={'/'} className="transition-opacity hover:opacity-75">
            ❤ - Swipe
          </NavLink>
          <NavLink
            to={'/matches'}
            className="transition-opacity hover:opacity-75"
          >
            💬 - Matches
          </NavLink>
          <NavLink
            to={'/profile'}
            className="transition-opacity hover:opacity-75"
          >
            🧔 - Profiles
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h2 className="mb-6 font-bold">Settings</h2>
      </div>
    </MobileLayout>
  );
}
