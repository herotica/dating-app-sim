import { create } from 'zustand';

const INITIAL_GRAB = 2;

function getGirl(setCall, getCall) {
  const unloadedSwipes = getCall().unloadedSwipesSourced;

  if (unloadedSwipes.length > 0) {
    const randomIndex = Math.floor(Math.random() * unloadedSwipes.length);
    const swipeData = unloadedSwipes[randomIndex];

    fetch(`${swipeData.source}/girl-${swipeData.swipe}.json`).then(
      async girlDataRes => {
        const girlData = await girlDataRes.json();

        setCall(state => ({
          girlsData: [
            ...state.girlsData,
            { ...girlData, apiID: swipeData.swipe, apiSource: swipeData.source }
          ],
          unloadedSwipesSourced: state.unloadedSwipesSourced.filter(
            v => v.swipe !== swipeData.swipe || v.source !== swipeData.source
          )
        }));
      }
    );
  }
}

const useGirlsStore = create((set, get) => ({
  swipesLoaded: false,
  allSwipes: [],
  unloadedSwipesSourced: [],
  girlsData: [],
  girlsDataKeyed: {},
  init: (seenIDs, sources) => {
    if (!get().swipesLoaded) {
      set(() => ({ swipesLoaded: true }));
      sources.forEach(source => {
        fetch(`${source}/swipes.json`).then(async r => {
          const allSwipes = await r.json();

          set(s => ({
            allSwipes: [...s.allSwipes, ...allSwipes],
            unloadedSwipesSourced: [
              ...s.unloadedSwipesSourced,
              ...allSwipes
                .filter(girlID => !seenIDs.includes(girlID))
                .map(swipe => ({
                  swipe,
                  source
                }))
            ]
          }));

          for (let index = 0; index < INITIAL_GRAB; index++) {
            getGirl(set, get);
          }
        });
      });
    }
  },
  getAnotherGirl: () => getGirl(set, get),
  getGirlData: async (source, id) => {
    console.log('getGirlData', {
      source,
      id
    });
    if (!!get().girlsDataKeyed[id]) {
      return get().girlsDataKeyed[id];
    }
    return await fetch(`${source}/girl-${id}.json`)
      .then(async girlDataRes => {
        const girl = await girlDataRes.json();
        return { ...girl, apiID: id, apiSource: source };
      })
      .catch(() => null);
  },
  girlSeen: () => {
    const girlsData = [...get().girlsData];
    girlsData.shift();
    set(s => ({ girlsData }));
  }
}));

export { useGirlsStore };
