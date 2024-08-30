import MobileLayout from '../components/mobile-layout';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useGirlsStore } from '../stores/girls.store';
import { useEffect, useState } from 'react';
import { usePlayerStore } from '../stores/player.store';
import { DateProgress } from '../components/date-progress';
import Header from '../components/header';

const CHAT_AVG_DELAY = 800;
const CHAT_VARIATION = 400;

const ERROR = {
  start: { chats: [{ type: 'player', data: ['Error getting chat data'] }] }
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ChatSwitch({ chat, onChoiceClick, girlInfo, girlID, playerProfile }) {
  const addPoints = usePlayerStore(s => s.addPoints);

  // match, player, matchImg, playerImg, choices
  switch (chat.type) {
    case 'match':
      return (
        <div className="flex w-full justify-end pl-8">
          <p className="rounded-l-full rounded-tr-full bg-gradient-to-r from-cyan-700 to-blue-800 px-4 py-1 text-xs text-white">
            {chat.text
              .replaceAll('$name', playerProfile.name)
              .replaceAll('$matchname', girlInfo.name)}
          </p>
        </div>
      );
    case 'player':
      return (
        <div className="flex w-full justify-start pr-8">
          <p className="rounded-r-full rounded-tl-full bg-slate-200 px-4 py-1 text-xs text-slate-900">
            {chat.text
              .replaceAll('$name', playerProfile.name)
              .replaceAll('$matchname', girlInfo.name)}
          </p>
        </div>
      );
    case 'matchImg':
      return (
        <div className="flex w-full justify-end pl-8">
          <img src={chat.text} className="max-h-44 rounded-lg" />
        </div>
      );
    case 'playerImg':
      return (
        <div className="flex w-full justify-start pr-8">
          <img src={chat.text} className="max-h-44 rounded-lg" />
        </div>
      );
    case 'choices':
      return (
        <div className="flex w-full flex-col justify-start gap-1 pr-8">
          {chat.text.map(c => (
            <button
              key={c.text}
              onClick={() => {
                if (c.points) {
                  addPoints(girlID, c.points);
                }
                onChoiceClick(c.blockID, c.text);
              }}
              className="w-auto rounded-r-full rounded-tl-full bg-gradient-to-r from-amber-700 to-orange-800 px-4 py-1 text-left text-xs text-white"
            >
              {c.text
                .replaceAll('$name', playerProfile.name)
                .replaceAll('$matchname', girlInfo.name)}
            </button>
          ))}
        </div>
      );
    default:
      break;
  }
}

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const [girlInfo, setGirlInfo] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatData, setChatData] = useState(null);
  const girlID = searchParams.get('girlID');
  const getGirlData = useGirlsStore(s => s.getGirlData);
  const chatHistoryKeyed = usePlayerStore(s => s.chatHistoryKeyed);
  const updateGirlChat = usePlayerStore(s => s.updateGirlChat);
  const updateGirlChats = usePlayerStore(s => s.updateGirlChats);
  const playerProfile = {
    name: 'Roger'
  };

  useEffect(() => {
    if (chats.length === 0 && !!chatHistoryKeyed?.[girlID]?.chats) {
      setChats(chatHistoryKeyed[girlID].chats);
    }
  }, [chats, girlID]);

  useEffect(() => {
    async function updateGirlInfo() {
      if (girlID && !chatData) {
        fetch(`/data/chat-${girlID}.json`).then(async chatDataRes => {
          const chatDataRaw = await chatDataRes.json();
          setChatData(chatDataRaw);

          if (chats.length === 0 && !!chatHistoryKeyed?.[girlID]?.chats) {
            setChats(chatHistoryKeyed[girlID].chats);
          } else if (!!chatDataRaw) {
            processChatBlock(chatDataRaw, 'start');
          }
        });
      }
      const girlInfoData = await getGirlData(girlID);
      setGirlInfo(girlInfoData);
    }
    updateGirlInfo();
  }, [girlID]);

  async function processChatBlock(chatDataRaw, blockID) {
    const blocks = !!chatDataRaw
      ? chatDataRaw[blockID].chats
      : chatData[blockID].chats;

    if (!!blocks) {
      // fast update store
      const newChats = [];
      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        switch (block.type) {
          case 'player':
            for (let indexB = 0; indexB < block.data.length; indexB++) {
              newChats.push({ type: 'player', text: block.data[indexB] });
            }
            break;
          case 'playerImg':
            newChats.push({ type: 'playerImg', text: block.data });
            break;
          case 'match':
            for (let indexB = 0; indexB < block.data.length; indexB++) {
              newChats.push({ type: 'match', text: block.data[indexB] });
            }
            break;
          case 'matchImg':
            newChats.push({ type: 'matchImg', text: block.data });
            break;
          case 'choices':
            newChats.push({ type: 'choices', text: block.data });
            break;
        }
      }
      updateGirlChat(girlID, newChats);

      // 'slowly' present data on page to simulate interaction
      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];

        switch (block.type) {
          case 'player':
            for (let indexB = 0; indexB < block.data.length; indexB++) {
              const text = block.data[indexB];

              if (indexB === 0) {
                setChats(s => [...s, { type: 'player', text }]);
              } else {
                await timeout(Math.floor(CHAT_AVG_DELAY / 1.5));
                setChats(s => [...s, { type: 'player', text }]);
              }
            }
            break;
          case 'playerImg':
            setChats(s => [...s, { type: 'playerImg', text: block.data }]);
            break;

          case 'match':
            for (let indexB = 0; indexB < block.data.length; indexB++) {
              const text = block.data[indexB];

              if (indexB === 0) {
                setChats(s => [...s, { type: 'match', text }]);
              } else {
                await timeout(
                  CHAT_AVG_DELAY + Math.floor(Math.random() * CHAT_VARIATION)
                );
                setChats(s => [...s, { type: 'match', text }]);
              }
            }
            break;
          case 'matchImg':
            setChats(s => [...s, { type: 'matchImg', text: block.data }]);
            break;
          case 'choices':
            setChats(s => [...s, { type: 'choices', text: block.data }]);
            break;

          default:
            break;
        }
      }
    }
  }

  function onChoiceClick(blockID, text) {
    setChats(s => {
      const fresh = [
        ...s.filter((_, i) => i + 1 !== s.length),
        { type: 'player', text }
      ];
      updateGirlChats(girlID, fresh);
      processChatBlock(chatData, blockID);

      return fresh;
    });
  }

  function resetChat() {
    setChats([]);
    updateGirlChats(girlID, []);
    processChatBlock(chatData, 'start');
  }

  return (
    <MobileLayout>
      <div>
        <Header />

        {!!girlInfo && (
          <div className=" flex h-full max-h-[70vh] flex-1 flex-col gap-2 px-4 pb-2">
            <h3 className="text-sm">
              You matched with <b>{girlInfo.username}</b>
            </h3>

            <div className="flex justify-between">
              <NavLink
                to={`/view-profile?girlID=${girlID}`}
                className="w-min whitespace-nowrap rounded-full bg-amber-200 px-2 py-1 text-xs"
              >
                View Profile
              </NavLink>

              <button
                onClick={resetChat}
                className="w-min whitespace-nowrap rounded-full bg-orange-200 px-2 py-1 text-xs"
              >
                Reset Chat
              </button>
            </div>

            {!!girlInfo.dates ? (
              <DateProgress
                girlInfo={girlInfo}
                playerPoints={chatHistoryKeyed[girlID]?.playerPoints ?? 0}
                girlID={girlID}
              />
            ) : (
              <> </>
            )}

            <div className="thin-scroll flex flex-col-reverse gap-2 overflow-y-scroll px-2 pt-12 text-slate-800">
              {[...chats].reverse().map(c => (
                <ChatSwitch
                  key={c.text}
                  chat={c}
                  onChoiceClick={onChoiceClick}
                  girlInfo={girlInfo}
                  girlID={girlID}
                  playerProfile={playerProfile}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
