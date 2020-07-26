import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import DrinkCard from '../components/DrinkCard';

const GET_DRINKS_LIST = gql`
  query($id: ID!) {
    drinks(where: { drink_type: { id: $id } }) {
      id
      Name
      Description
      Image {
        url
      }
      Price
      measures {
        Name
      }
      drink_type {
        Type
      }
    }
  }
`;

function Drinks(props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_DRINKS_LIST, {
    variables: { id: router.query.id },
  });

  if (error) {
    console.log(error);
    return 'Error fetching drinks';
  }
  if (loading) return <h1>Loading...</h1>;
  if (data.drinks) {
    const { drinks } = data;

    return (
      <>
        <div className="w-full p-4">
          <h1 className="text-gray-800 text-lg text-center">
            Browsing {drinks[0].drink_type.Type}
          </h1>
          <div className="flex w-full">
            {drinks.map((drink, i) => {
              return <DrinkCard key={i} drink={drink} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Drinks;
