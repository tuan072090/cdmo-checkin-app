import {combineReducers} from 'redux';
import authReducer from './auth';
import messageReducer from './message';
import merchantsReducer from './merchants'

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  merchants: merchantsReducer
});

export default rootReducer;
