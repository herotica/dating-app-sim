import { useEffect, useState } from 'react';
import MobileLayout from '../components/mobile-layout';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/header';

export default function DatePage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [dateInfo, setDateInfo] = useState(null);
  const girlID = searchParams.get('girlID');
  const dateID = searchParams.get('dateID');
  const source = searchParams.get('source');

  useEffect(() => {
    if (!!girlID && !!dateID) {
      fetch(`${source}/date-${girlID}-${dateID}.json`).then(
        async dateInfoRaw => {
          const dateInfoJSON = await dateInfoRaw.json();
          setDateInfo(dateInfoJSON);
        }
      );
    }
  }, [girlID, dateID]);

  return (
    <MobileLayout>
      <div className="flex w-full flex-col gap-4">
        <Header
          Left={
            <button
              onClick={() => navigate(-1)}
              className="transition-opacity hover:opacity-75"
            >
              ⬅ Back
            </button>
          }
        />

        <div className="thin-scroll flex max-h-[70vh] flex-col gap-4 overflow-y-scroll p-4 text-xs">
          {dateInfo?.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-2">
              {!!section?.title && (
                <h4 className="text-sm font-bold">{section.title}</h4>
              )}
              {!!section?.img && (
                <img
                  className="w-full"
                  src={
                    section.img.substring(0, 4) === 'http'
                      ? section.img
                      : `${source}/date-pics/${section.img}`
                  }
                />
              )}
              {!!section?.text && (
                <p className="whitespace-pre-wrap">{section.text}</p>
              )}
              {!!section?.player && (
                <p className="rounded-r-full rounded-tl-full bg-slate-200 px-4 py-1 text-xs text-slate-900">
                  {section.player}
                </p>
              )}
              {!!section?.match && (
                <p className="rounded-l-full rounded-tr-full bg-gradient-to-r from-cyan-700 to-blue-800 px-4 py-1 text-xs text-white">
                  {section.match}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
