import { create } from 'zustand';

const INITIAL_GRAB = 2;

function getGirl(setCall, getCall) {
  const unloadedSwipes = getCall().unloadedSwipes;

  if (unloadedSwipes.length > 0) {
    const randomIndex = Math.floor(Math.random() * unloadedSwipes.length);

    fetch(`/data/girl-${unloadedSwipes[randomIndex]}.json`).then(
      async girlDataRes => {
        const girlData = await girlDataRes.json();

        setCall(state => ({
          girlsData: [
            ...state.girlsData,
            { ...girlData, apiID: unloadedSwipes[randomIndex] }
          ],
          unloadedSwipes: state.unloadedSwipes.filter(
            v => v !== unloadedSwipes[randomIndex]
          )
        }));
      }
    );
  }
}

const useGirlsStore = create((set, get) => ({
  swipesLoaded: false,
  allSwipes: [],
  unloadedSwipes: [],
  girlsData: [],
  girlsDataKeyed: {},
  init: seenIDs => {
    if (!get().swipesLoaded) {
      set(() => ({ swipesLoaded: true }));
      fetch('/data/swipes.json').then(async r => {
        const allSwipes = await r.json();
        const checkedSwipes = allSwipes;
        set(() => ({
          allSwipes: checkedSwipes,
          unloadedSwipes: checkedSwipes.filter(
            girlID => !seenIDs.includes(girlID)
          )
        }));

        for (let index = 0; index < INITIAL_GRAB; index++) {
          getGirl(set, get);
        }
      });
    }
  },
  getAnotherGirl: () => getGirl(set, get),
  getGirlData: async id => {
    if (!!get().girlsDataKeyed[id]) {
      return get().girlsDataKeyed[id];
    }
    return await fetch(`/data/girl-${id}.json`)
      .then(async girlDataRes => await girlDataRes.json())
      .catch(() => null);
  },
  girlSeen: () => {
    const girlsData = [...get().girlsData];
    girlsData.shift();
    set(s => ({ girlsData }));
  }
}));

export { useGirlsStore };
