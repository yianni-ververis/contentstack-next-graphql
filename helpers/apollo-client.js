import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from 'node-fetch';

console.log(process.env.CONTENTSTACK_API_KEY)
console.log(process.env.CONTENTSTACK_ENVIRONMENT)
console.log(process.env.CONTENTSTACK_DELIVERY_TOKEN)

const link = new HttpLink({
	uri:`https://graphql.contentstack.com/stacks/${process.env.CONTENTSTACK_API_KEY}/?environment=${process.env.CONTENTSTACK_ENVIRONMENT}`,
	fetch,
  headers: {
    access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  },
})

const client = new ApolloClient({
	link: from([link]),
	cache: new InMemoryCache(),
});

export default client;