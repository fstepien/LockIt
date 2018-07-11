import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Navigator from "./Navigator";

const client = new ApolloClient({
  link: new createHttpLink({
    uri: "https://api.graph.cool/simple/v1/cjjh086wb36820164m555gyyb"
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
