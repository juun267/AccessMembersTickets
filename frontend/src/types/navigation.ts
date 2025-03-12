import { Event, Order } from './index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Events: undefined;
  EventDetails: { event: Event };
  OrderConfirmation: { order: Order };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 