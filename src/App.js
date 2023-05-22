import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import './App.css';

function App() {
  const [id, setId] = useState();
  const queryClient = useQueryClient();

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      await axios.get('https://api.escuelajs.co/api/v1/products'),
    staleTime: 1000 * 60 * 10, // the length of time before the data becomes stale (i.e. max time to be considered fresh).
  });

  const { data: productResult } = useQuery({
    queryKey: [`product${id}`],
    queryFn: async () =>
      await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`),
    enabled: !!id, // to control when to execute the fetch query.
    staleTime: 1000 * 60 * 10,
  });

  const mutation = useMutation({
    mutationFn: async (body) =>
      await axios.put('https://api.escuelajs.co/api/v1/products/8', body),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['products'] }); // marks queries as stale and overrides any staleTime configurations.
        queryClient.invalidateQueries({ queryKey: [`product${id}`] });
      }, 1000);
    },
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
      <button onClick={() => mutation.mutate({ title: 'Hello World' })}>
        Update item
      </button>
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
