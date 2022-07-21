
import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';

import {AppNavigation} from './src/screens';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import Colors from './src/share/index';

const theme = extendTheme({
  colors: Colors,
});
const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
