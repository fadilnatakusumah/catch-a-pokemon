import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';

import App from "../App";

const GRAPHQL_URL = "https://graphql-pokeapi.vercel.app/api/graphql";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
})


export const ApolloProviderApp = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] = useState<CachePersistor<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });

      await newPersistor.restore();
      setPersistor(newPersistor);
      setClient(
        new ApolloClient({
          cache,
          link: httpLink as any,
        }),
      );

      const checkSize = await persistor?.getSize();
      if (checkSize && checkSize > 50000) {
        console.log("PURGING CACHE");
        persistor?.purge();
        persistor?.remove();
      }
    }


    init().catch(console.error);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

