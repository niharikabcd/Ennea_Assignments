import { Select } from 'antd';
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { InputContext } from '../InputContext';
import { useContext } from 'react';

const queryClient = new QueryClient();

export const fetchPosts = async () => {
  const res = await fetch('https://dummyjson.com/products/category-list');
    const data = await res.json();
    return data;
};

const InputSearch = () => {
  console.log('Input search is rendering...')
  return (
    <QueryClientProvider client={queryClient}>
      <InputSearch1 />
    </QueryClientProvider>
  );
};

const InputSearch1 = () => {
  const {setSelect}=useContext(InputContext);
  const { isFetching, error, data } = useQuery({
    queryKey: ['key'],
    queryFn: fetchPosts,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Select
        showSearch
        placeholder="Select a category"
        optionFilterProp="children"
        onChange={(value) => {
          console.log(`selected ${value}`)
          setSelect(value);      
        }}
        onSearch={ (value) => {
          console.log('search:', value);
          }
        }
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={data ? data.map((category) => ({
          value: category,
          label: category,
        })) : []}
      />
    </>
  );
};

export default InputSearch;
