import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useGirlsStore } from './stores/girls.store';
import { usePlayerStore } from './stores/player.store';

import SwipePage from './routes/swipe';
import ProfilePage from './routes/profile';
import ChatPage from './routes/chat';
import MatchesPage from './routes/matches';
import ViewProfile from './routes/view-profile';
import DatePage from './routes/date';
import HelpPage from './routes/help';

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
  },
  {
    path: '/date',
    element: <DatePage />
  },
  {
    path: '/help',
    element: <HelpPage />
  }
]);

function RootWrap({ children }) {
  const fillerGirlIDs = usePlayerStore.getState().fillerGirlIDs;
  const likedInteractionGirlsSkippedIDs =
    usePlayerStore.getState().likedInteractionGirlsSkippedIDs;
  const likedInteractionGirlInfo =
    usePlayerStore.getState().likedInteractionGirlInfo;
  const sources = usePlayerStore.getState().sources;

  const girlStoreInit = useGirlsStore(s => s.init);

  useEffect(() => {
    girlStoreInit(
      [
        ...fillerGirlIDs,
        ...likedInteractionGirlsSkippedIDs,
        ...likedInteractionGirlInfo.map(g => g.apiID)
      ],
      sources
    );
  }, [girlStoreInit]);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RootWrap>
    <RouterProvider router={router} />
  </RootWrap>
);
