import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';

import {AppNavigation} from '@/screens';
import {Provider} from 'react-redux';
import {persistor, store} from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import {Colors} from '@/share/config/colors';
import 'react-native-gesture-handler';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const theme = extendTheme({
    colors: Colors,
});
const AppLoading = () => <View style={styles.loader}><ActivityIndicator color={Colors.primary['500']}/></View>
const App = () => {
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={<AppLoading/>} persistor={persistor}>
                    <AppNavigation/>
                </PersistGate>
            </Provider>
        </NativeBaseProvider>
    );
};

export default App;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center'
    }
})
