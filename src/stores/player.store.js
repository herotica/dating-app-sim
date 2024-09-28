import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const SOURCES = [
  import.meta.env.VITE_NSFW_URL_1,
  import.meta.env.VITE_NSFW_URL_2,
  import.meta.env.VITE_NSFW_URL_3,
  import.meta.env.VITE_NSFW_URL_4,
  '/data'
].filter(v => !!v);

const usePlayerStore = create(
  persist(
    (set, get) => ({
      fillerMatches: 0,
      fillersSkipped: 0,
      fillerGirlIDs: [],
      likedInteractionGirlsSkippedIDs: [],
      likedInteractionGirlInfo: [],
      chatHistoryKeyed: {},
      sources: SOURCES,
      matchWithGirl: girlData => {
        if (girlData.hasInteractions) {
          if (
            !get().likedInteractionGirlInfo.find(
              girl => girl.apiID === girlData.apiID
            )
          ) {
            set(state => ({
              likedInteractionGirlInfo: [
                ...state.likedInteractionGirlInfo,
                {
                  apiID: girlData.apiID,
                  apiSource: girlData.apiSource,
                  lastMessage: girlData.firstMessage,
                  messageID: null,
                  username: girlData.username,
                  icon: girlData.pictures[0]
                }
              ]
            }));
          }
        } else {
          set(state => ({
            fillerMatches: state.fillerMatches + 1,
            fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
          }));
        }
      },
      skipGirl: girlData => {
        if (girlData.hasInteractions) {
          set(state => ({
            likedInteractionGirlsSkippedIDs: [
              ...state.likedInteractionGirlsSkippedIDs,
              {
                id: girlData.apiID,
                source: girlData.apiSource,
                name: girlData.name
              }
            ]
          }));
        } else {
          set(state => ({
            fillersSkipped: state.fillersSkipped + 1,
            fillerGirlIDs: [...state.fillerGirlIDs, girlData.apiID]
          }));
        }
      },
      updateGirlChat: (girlID, newChats) => {
        set(state => {
          if (!!state.chatHistoryKeyed[girlID]) {
            return {
              chatHistoryKeyed: {
                ...state.chatHistoryKeyed,
                [girlID]: {
                  ...state.chatHistoryKeyed[girlID],
                  chats: [...state.chatHistoryKeyed[girlID].chats, ...newChats]
                }
              }
            };
          } else {
            return {
              chatHistoryKeyed: {
                ...state.chatHistoryKeyed,
                [girlID]: {
                  chats: newChats,
                  playerPoints: 0
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
            [girlID]: {
              ...s.chatHistoryKeyed[girlID],
              chats: replaceWith,
              lastMessage: 'TODO'
            }
          }
        }));
      },
      addPoints: (girlID, newPoints) => {
        set(s => ({
          chatHistoryKeyed: {
            ...s.chatHistoryKeyed,
            [girlID]: {
              ...s.chatHistoryKeyed[girlID],
              playerPoints: s.chatHistoryKeyed[girlID].playerPoints + newPoints
            }
          }
        }));
      },
      updatesSources: sources => set({ sources }),
      removeSkippedGirl: girlArrayIndex =>
        set(s => ({
          likedInteractionGirlsSkippedIDs:
            s.likedInteractionGirlsSkippedIDs.filter(
              (_, i) => i !== girlArrayIndex
            )
        }))
    }),
    { name: 'player-store' }
  )
);

export { usePlayerStore };
