import React from 'react';
import {useAppSelector} from '../../../redux/store';
import LoginScreen from '../../../screens/login';

const AuthTemplate = (Component: React.FC<any>) => ({...props}) => {
    const {accessToken} = useAppSelector(state => state.auth);

    return <>{!accessToken || accessToken.length === 0 ? <LoginScreen/> : <Component {...props} />}</>;
};

export default AuthTemplate;
