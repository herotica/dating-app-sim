import MobileLayout from '../components/mobile-layout';
import { NavLink } from 'react-router-dom';

export default function Profile() {
  return (
    <MobileLayout>
      <div>
        <header className="flex justify-between p-2">
          <NavLink to={'/'} className="transition-opacity hover:opacity-75">
            ❤
          </NavLink>
          <NavLink
            to={'/matches'}
            className="transition-opacity hover:opacity-75"
          >
            💬
          </NavLink>
        </header>
        TODO
      </div>
    </MobileLayout>
  );
}
