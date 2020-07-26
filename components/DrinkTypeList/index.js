import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Link from 'next/link';

const QUERY = gql`
  {
    drinkTypes {
      id
      Type
      Image {
        url
      }
      Description
    }
  }
`;

function DrinkTypeList(props) {
  const { loading, error, data } = useQuery(QUERY);
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (error) return 'Error loading drinks';
  if (loading) return <h1>Loading drinks...</h1>;
  if (data.drinkTypes && data.drinkTypes.length) {
    //Search query
    const searchQuery = data.drinkTypes.filter((query) =>
      query.Type.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <div className="w-full flex">
          {searchQuery.map((res, i) => (
            <div
              className="w-1/3 md:w-1/4 bg-gray-100 text-gray-800 rounded shadow mt-2 text-center mr-3 pb-4"
              key={i}
            >
              <img src={url + res.Image[0].url} className="w-full rounded " />
              <h1 className="pt-2">{res.Type}</h1>
              <p className="text-sm text-gray-500 mb-2">{res.Description}</p>

              <Link as={`/drinks/${res.id}`} href={`/drinks?id=${res.id}`}>
                <a className="my-2 rounded p-1 px-2 text-sm bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg transition transition-all duration-100 ease-linear">
                  Browse {res.Type}
                </a>
              </Link>
            </div>
          ))}
        </div>
      );
    } else {
      return <h1>No drink types found</h1>;
    }
  }
  return <h5>Add drink type</h5>;
}

export default DrinkTypeList;
