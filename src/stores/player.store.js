import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  missedMatches: 0,
  fillerGirlIDs: [],
  likedInteractionGirlInfo: [],
  chatHistoryKeyed: {},
  matchWithGirl: girlData => {
    console.log('girlData', girlData);
    if (girlData.hasInteractions) {
      set(state => ({
        likedInteractionGirlInfo: [
          ...state.likedInteractionGirlInfo,
          {
            apiID: girlData.apiID,
            lastMessage: girlData.firstMessage,
            messageID: null,
            username: girlData.username,
            icon: girlData.pictures[0]
          }
        ]
      }));
    } else {
      set(state => ({
        missedMatches: state.missedMatches + 1,
        fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
      }));
    }
  },
  skipGirl: girlData => {
    set(state => ({
      fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
    }));
  }
}));

export { usePlayerStore };
