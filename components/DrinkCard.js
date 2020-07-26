import React from 'react';
import Link from 'next/link';

const url = 'http://localhost:1337';

const DrinkCard = ({ drink }) => {
  return (
    <div className="w-full md:w-1/4 bg-gray-100 text-gray-800 rounded shadow mt-2 text-center mr-3 pb-4">
      <img src={url + drink.Image.url} className="w-full rounded " />
      <h1 className="pt-2">{drink.Name}</h1>
      <p className="text-sm text-gray-500 mb-2">{drink.Description}</p>
      {drink.measures[1]
        ? drink.measures.map((m, i) => {
            return (
              <div className="text-center text-sm text-gray-700 mt-1 leading-loose bg-gray-800">
                {m.Name === 'Half Pint' ? (
                  <div className="mb-4">
                    <a className="my-4 rounded p-1 px-2 text-sm bg-gray-800 mb-4 text-white hover:bg-gray-700 hover:shadow-lg transition transition-all duration-100 ease-linear hover:cursor-pointer">
                      {`Buy ${m.Name} - £${(drink.Price / 2).toFixed(2)}`}
                    </a>
                  </div>
                ) : (
                  <div className="mb-4 bg-gray-800">
                    <a className="my-4 rounded p-1 px-2 text-sm bg-gray-800 mb-4 text-white hover:bg-gray-700 hover:shadow-lg transition transition-all duration-100 ease-linear hover:cursor-pointer leading-loose">
                      {`Buy ${m.Name} - £${drink.Price.toFixed(2)}`}
                    </a>
                  </div>
                )}
              </div>
            );
          })
        : `${drink.measures[0].Name} - £${drink.Price}}`}
    </div>
  );
};

export default DrinkCard;
