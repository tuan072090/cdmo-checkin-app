import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';

import {AppNavigation} from '@/screens';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';

// import {Colors} from '@/share/config/colors';

const theme = extendTheme({
    // colors: Colors,
});
const App = () => {
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <AppNavigation/>
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;
