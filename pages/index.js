import React, { useState } from 'react';

import DrinkTypeList from '../components/DrinkTypeList';

function Home() {
  const [query, updateQuery] = useState(' ');
  return (
    <div className="w-full p-4 text-gray-700">
      <div className="text-center">
        <p className="inline">Search</p>
        <input
          onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
          value={query}
          className="border ml-4 border-gray-700 shadow"
          placeholder="Search our drinks list"
        />
      </div>
      <div className="w-full mt-4 text-gray-700">
        <DrinkTypeList search={query} />
      </div>
    </div>
  );
}

export default Home;
