import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import '../src/styles.css';
import { NoUnoProvider } from '../src/context/nouno/index';
import { Header } from '../src/components/layout/header';
import { Footer } from '../src/components/layout/footer';
import { Card } from '../src/components/ui';

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NoUnoProvider>
        <Card
          width="100vw"
          height="100vh"
          direction="column"
          justifyContent="space-between"
        >
          <Header height="10%"/>
          
          <Card height="80%">
            <Component {...pageProps} />
          </Card>

          <Footer height="10%"/>
        </Card>
        
      </NoUnoProvider>
    </QueryClientProvider>
  )
}

export default MyApp
