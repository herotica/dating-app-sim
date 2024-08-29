import { create } from 'zustand';

const usePlayerStore = create((set, get) => ({
  fillerMatches: 0,
  fillersSkipped: 0,
  fillerGirlIDs: [],
  likedInteractionGirlsSkippedIDs: [],
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
    if (girlData.hasInteractions) {
      set(state => ({
        likedInteractionGirlsSkippedIDs: [
          ...state.likedInteractionGirlsSkippedIDs,
          girlData.apiID
        ]
      }));
    } else {
      set(state => ({
        fillersSkipped: state.fillersSkipped + 1,
        fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
      }));
    }
  },
  updateGirlChat: (girlID, newChats, unlocks) => {
    set(state => {
      if (state.chatHistoryKeyed[girlID]) {
        return {
          chatHistoryKeyed: {
            ...state.chatHistoryKeyed,
            [girlID]: {
              chats: [...state.chatHistoryKeyed[girlID].chats, ...newChats],
              unlocks
            }
          }
        };
      } else {
        return {
          chatHistoryKeyed: {
            ...state.chatHistoryKeyed,
            [girlID]: {
              chats: newChats,
              unlocks
            }
          }
        };
      }
    });
  },
  updateGirlChats: (girlID, replaceWith) => {
    set(s => ({
      chatHistoryKeyed: {
        ...s.chatHistoryKeyed,
        [girlID]: { ...s.chatHistoryKeyed[girlID], chats: replaceWith }
      }
    }));
  }
}));

export { usePlayerStore };
