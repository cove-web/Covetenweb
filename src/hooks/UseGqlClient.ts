// import { ApolloClient, InMemoryCache } from '@apollo/client';



// export const useGqlClient = () => {

//   const client = new ApolloClient({
//     uri: 'https://coventenapp.el.r.appspot.com',
//     cache: new InMemoryCache(),
//   });

//   return client;
// };




import { GraphQLClient } from 'graphql-hooks';
import Cookies from 'js-cookie';
// import memCache from 'graphql-hooks-memcache'




export const useGqlClient = () => {
  const client = new GraphQLClient({
    url: 'http://localhost:25000/',
    // url: 'http://localhost:4000/',
  });

  const token = Cookies.get('conventenToken');
  if (token) {
    client.setHeader('authorization', `Bearer ${token}`)
  }
  return client;
};