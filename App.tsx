/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';

import {AppNavigation} from './src/screens';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import Colors from './src/share/index'

const theme = extendTheme({
  colors: Colors
});
const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
