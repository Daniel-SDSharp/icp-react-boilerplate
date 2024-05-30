import { Suspense } from 'react';
import RouterSwitch from './router/RouterSwitch';
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ChakraProvider>
          <RouterSwitch />
        </ChakraProvider>
      </Provider>
    </Suspense>
  );
};

export default App;
