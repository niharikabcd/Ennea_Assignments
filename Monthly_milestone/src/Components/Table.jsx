import { Table } from 'antd';
import React,{memo} from 'react';
import { useContext } from 'react';
import { InputContext } from '../InputContext';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query';
  
const queryClient = new QueryClient();
  const TableComp = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <TableComp1/>
      </QueryClientProvider>
    );
  };
  const TableComp1 = memo(() => {
    console.log('Tablecomponent is rendering...')
    const {select}=useContext(InputContext);//Getting Context from the Global State
    //fetching data based on the global state with function fetchPosts
    const fetchPosts = async () => {
        const url=`https://dummyjson.com/products/category/${select}`
        const res = await fetch(url);
          const data = await res.json();
          return data;
      }
    //storing fetched data in data variable using Tanstack Query
    const { isFetching, error, data } = useQuery({
      queryKey: ['keys',select],
      queryFn: fetchPosts,
    });
  
    if (isFetching) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
    return(
  <Table columns={[
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
  ]}
    //extracting products as well as product data from data
    dataSource={ data.products ? data.products.map((category) => ({
        'id': category.id,
        'title': category.title,
        'category':category.category,
      })) : []} />);
    })
export default (TableComp);