import React, {PropsWithChildren, useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import AuthTemplate from '../../component/templates/auth';
import {useAppSelector} from '../../redux/store';
import {getShippingPlanService} from '../../share/services/shipping-plan';

const HomeScreen = AuthTemplate(() => {
  const {accessToken} = useAppSelector(state => state.auth);

  const [plans, setPlans] = useState<any[]>([]);
  console.log('accessToken', accessToken);
  useEffect(() => {
    // getShippingPlan();
  }, []);

  const getShippingPlan = async () => {
    try {
      const data = await getShippingPlanService();
      // setPlans(data);
      console.log('plans', data);
    } catch (errr) {
      console.log('err');
    }
  };
  return (
    <SafeAreaView>
      <Text>home screen</Text>
    </SafeAreaView>
  );
});

export default HomeScreen;
