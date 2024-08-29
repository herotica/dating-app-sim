import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SwipePage from './routes/swipe';
import ProfilePage from './routes/profile';
import ChatPage from './routes/chat';
import MatchesPage from './routes/matches';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SwipePage />
  },
  {
    path: '/matches',
    element: <MatchesPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/view-profile',
    element: <ViewProfile />
  }
]);

import './index.css';
import { useGirlsStore } from './stores/girls.store';
import ViewProfile from './routes/view-profile';

function RootWrap({ children }) {
  const girlStoreInit = useGirlsStore(s => s.init);

  useEffect(() => {
    girlStoreInit();
  }, [girlStoreInit]);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RootWrap>
    <RouterProvider router={router} />
  </RootWrap>
);
