import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import './App.css';

function App() {
  const [id, setId] = useState();

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      await axios.get('https://api.escuelajs.co/api/v1/products'),
    staleTime: 1000 * 60 * 10, // the length of time before the data becomes stale (i.e. max time to be considered fresh)
  });

  const { data: productResult } = useQuery({
    queryKey: [`product${id}`],
    queryFn: async () =>
      await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`),
    enabled: !!id, // to control when to execute the fetch query
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <h1>{productResult?.data.title}</h1>
      <ul>
        {results?.data.map((item) => (
          <li key={item.id} onClick={() => setId(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
