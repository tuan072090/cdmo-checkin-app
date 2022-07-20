import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useAppSelector} from '../../../redux/store';
import LoginScreen from '../../../screens/login';

const AuthTemplate =
  (Component: React.FC<any>) =>
  ({...props}) => {
    const [checkAuth, setCheckAuth] = useState<boolean>(true);
    const {accessToken} = useAppSelector(state => state.auth);
    useEffect(() => {
      if (accessToken && accessToken.length > 0) {
        setCheckAuth(false);
      } else {
        setCheckAuth(true);
      }
    }, [accessToken]);

    return <>{checkAuth ? <LoginScreen /> : <Component {...props} />}</>;
  };

export default AuthTemplate;
