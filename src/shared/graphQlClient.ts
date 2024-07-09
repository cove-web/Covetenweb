import { GraphQLClient } from 'graphql-request'

const endpoint = `https://coventenapp.el.r.appspot.com`

export const graphQLClient = new GraphQLClient(endpoint, {
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
})