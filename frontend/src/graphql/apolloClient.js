import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const API_ENDPOINT = "http://server-service:49757";
const API_ENDPOINT =
  window.location.protocol === "https:"
    ? `https://${window.location.host}`
    : `http://${window.location.host}`;

const httpLink = new HttpLink({
  uri: API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authToken from local storage
  const token = localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
