import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  fillerMatches: 0,
  fillersSkipped: 0,
  fillerGirlIDs: [],
  likedInteractionGirlInfo: [],
  chatHistoryKeyed: {},
  matchWithGirl: girlData => {
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
        fillerMatches: state.missedMatches + 1,
        fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
      }));
    }
  },
  skipGirl: girlData => {
    set(state => ({
      fillersSkipped: state.fillersSkipped + 1,
      fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
    }));
  },
  updateGirlChat: (girlID, chatBlock, lastBlockID) => {

  }
}));

export { usePlayerStore };
