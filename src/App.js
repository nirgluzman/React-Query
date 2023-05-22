import { useQuery } from 'react-query';
import axios from 'axios';

import './App.css';

function App() {
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => axios.get('https://api.escuelajs.co/api/v1/products'),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <ul>
        {results?.data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
