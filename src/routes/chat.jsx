import MobileLayout from '../components/mobile-layout';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useGirlsStore } from '../stores/girls.store';
import { useEffect, useState } from 'react';
import { usePlayerStore } from '../stores/player.store';

const CHAT_AVG_DELAY = 500;
const CHAT_VARIATION = 200;

const ERROR = {
  start: { chats: [{ type: 'player', data: ['Error getting chat data'] }] }
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ChatSwitch({ chat, onChoiceClick }) {
  // match, player, matchImg, playerImg, choices
  switch (chat.type) {
    case 'match':
      return (
        <div className="flex w-full justify-end pl-8">
          <p className="rounded-l-full rounded-tr-full bg-gradient-to-r from-cyan-700 to-blue-800 px-4 py-1 text-xs text-white">
            {chat.text}
          </p>
        </div>
      );
    case 'player':
      return (
        <div className="flex w-full justify-start pr-8">
          <p className="rounded-r-full rounded-tl-full bg-slate-200 px-4 py-1 text-xs text-slate-900">
            {chat.text}
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
              onClick={() => onChoiceClick(c.blockID, c.text)}
              className="w-max rounded-r-full rounded-tl-full bg-gradient-to-r from-amber-700 to-orange-800 px-4 py-1 text-xs text-white"
            >
              {c.text}
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

  useEffect(() => {
    console.log('girlID', girlID);

    async function updateGirlInfo() {
      if (girlID && !chatData) {
        fetch(`/data/chat-${girlID}.json`).then(async chatDataRes => {
          const chatDataRaw = await chatDataRes.json();
          setChatData(chatDataRaw);

          if (!!chatDataRaw) {
            console.log('chatDataRaw', chatDataRaw);
            updateGirlChat(girlID, chatDataRaw?.start);
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
      for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        console.log('block', block);

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

      return fresh;
    });
    processChatBlock(chatData, blockID);
  }
  console.log('chats', chats);

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
        {!!girlInfo && (
          <div className=" flex h-full max-h-[70vh] flex-1 flex-col gap-2  p-4">
            <h3 className="text-sm">You matched with {girlInfo.username}</h3>

            <div className="flex justify-between">
              <NavLink
                to={`/view-profile?girlID=${girlID}`}
                className="w-min whitespace-nowrap rounded-full bg-amber-200 px-2 py-1 text-xs"
              >
                View Profile
              </NavLink>

              <button className="w-min whitespace-nowrap rounded-full bg-orange-200 px-2 py-1 text-xs">
                Reset Chat
              </button>
            </div>

            <div className="thin-scroll flex flex-col-reverse gap-2 overflow-y-scroll px-2 pt-12 text-slate-800">
              {[...chats].reverse().map(c => (
                <ChatSwitch
                  key={c.text}
                  chat={c}
                  onChoiceClick={onChoiceClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
