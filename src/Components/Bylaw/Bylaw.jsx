import React, { useEffect, useState } from 'react';

export default function Bylaw({ changeByLaw, bylaw }) {
  const [useNewBylaw, setUseNewBylaw] = useState(bylaw);

  useEffect(() => {
    changeByLaw(useNewBylaw);
  }, [useNewBylaw]);

  // Optional sync with parent prop (uncomment if needed)
  useEffect(() => {
    setUseNewBylaw(bylaw);
  }, [bylaw]);

  return (
    <>
      <h2 className='mt-10 mb-4 text-black dark:text-white text-center text-3xl font-bold'>
        Select Used Bylaw
      </h2>
      <div className="mb-20 w-full lg:w-3/4 mx-auto p-4 border-blue-500 border-0 dark:border-2 rounded-3xl text-white">
        <form className="relative flex justify-between items-center p-1 bg-blue-950 rounded-full overflow-hidden">
          {/* Slider */}
          <div
            className="absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full transition-all duration-300"
            style={{
              transform: useNewBylaw ? 'translateX(100%)' : 'translateX(0%)',
            }}
          ></div>

          {/* Radio: Old Bylaw */}
          <input
            type="radio"
            id="useoldbylaw"
            name="bylawversion"
            className="hidden"
            checked={!useNewBylaw}
            onChange={() => setUseNewBylaw(false)}
          />
          <label
            htmlFor="useoldbylaw"
            className={`flex-1 text-center z-10 cursor-pointer py-2 ${
              !useNewBylaw ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Use Old Bylaw (A+, A)
          </label>

          {/* Radio: New Bylaw */}
          <input
            type="radio"
            id="usenewbylaw"
            name="bylawversion"
            className="hidden"
            checked={useNewBylaw}
            onChange={() => setUseNewBylaw(true)}
          />
          <label
            htmlFor="usenewbylaw"
            className={`flex-1 text-center z-10 cursor-pointer py-2 ${
              useNewBylaw ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Use New Bylaw (A+, A, A-)
          </label>
        </form>
      </div>
    </>
  );
}
