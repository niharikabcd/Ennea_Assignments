import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  import { Wrapper,Heading,Price,Text,Image,ErrorText,LoadingText } from './Styled';
  
  const queryClient = new QueryClient()
  
  export default function FitmeLip() {
    return (
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    )
  }
  //Fetching data
  export const fetchPosts = async () => {
    const response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  //Using React Query
  function Example() {
    const { isPending,data, error,isFetching} = useQuery({
      queryKey: ['lip'],
      queryFn: fetchPosts
    })
    //Error Handling and displaying loading states
    if (error) return <ErrorText>An error has occurred: {error.message}, Please check your internet connection</ErrorText>;
    if (isPending) return <LoadingText>Loading...</LoadingText>;
    if (isFetching) return <LoadingText>Refreshing...</LoadingText>;
  
    return (
      <Wrapper>
        <Heading>{data[7].name}</Heading>
        <Text>Description: {data[7].description}</Text>
        <Price>Price: ${data[7].price}</Price>
        <Image src={data[7].image_link} alt={data[7].name} />
      </Wrapper>
    );
  }