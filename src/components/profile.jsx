import { useEffect, useState } from 'react';

export default function Profile({ girl, hideDistance = false }) {
  const [profPicIndex, setProfPicIndex] = useState(0);

  useEffect(() => {
    setProfPicIndex(0);
  }, [girl]);

  return (
    <div className="thin-scroll h-60vh flex max-h-[calc(60vh-4rem)] flex-1 flex-col overflow-y-scroll">
      <div className="relative h-[calc(60vh-4rem)] flex-shrink-0">
        <img
          src={`${girl.apiSource}/prof-pics/${girl.pictures[profPicIndex]}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute bottom-0 left-0 flex h-full w-full flex-1 flex-col justify-between">
          <div className="sticky flex w-full justify-center gap-3">
            {girl.pictures.map((_, i) => (
              <button
                key={_ + i}
                onClick={() => setProfPicIndex(i)}
                className="pt-4 text-xs transition-opacity hover:opacity-80"
              >
                {profPicIndex === i ? <span>⚪</span> : <span>⚫</span>}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 bg-black bg-opacity-10 p-2 text-white">
            <div className="flex items-end gap-2">
              <h3 className="mb-0 text-lg font-semibold leading-none">
                {girl.username}
              </h3>
              <span className="leading-none">{girl.age}</span>
            </div>
            <div className="flex items-end gap-2 text-slate-200">
              {!hideDistance && (
                <span className="text-sm leading-none">
                  📍 {girl.distance} Miles away
                </span>
              )}
              <span className="text-sm leading-none">{girl.job}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-slate-100 p-6 text-xs font-medium text-slate-900">
        {!!girl.profile.tagline && (
          <div className="whitespace-pre-wrap rounded-md bg-white p-2">
            {girl.profile.tagline}
          </div>
        )}

        {!!girl.profile.lookingfor && (
          <div className="rounded-md bg-white p-2">
            <h4 className="text-sm">Looking for:</h4>
            <span>{girl.profile.lookingfor}</span>
          </div>
        )}

        {!!girl.profile.interests && (
          <div className="rounded-md bg-white p-2">
            <h4 className="mb-4 text-sm">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {girl.profile.interests.map(interest => (
                <span
                  key={interest}
                  className="rounded-full border border-slate-600 p-1 px-2"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {!!girl.profile.lifestyle && (
          <div className="rounded-md bg-white p-2">
            <h4 className="mb-4 text-sm">Lifestyle</h4>
            <div className="flex flex-wrap gap-2">
              {girl.profile.lifestyle.map(style => (
                <span
                  key={style}
                  className="rounded-full border border-slate-600 p-1 px-2"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
