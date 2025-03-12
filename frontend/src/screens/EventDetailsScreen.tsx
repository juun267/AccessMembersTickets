import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { Event } from '../types';
import { NavigationProp, RootStackParamList } from '../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GET_EVENTS } from './EventListScreen';

export const PURCHASE_TICKETS = gql`
  mutation PurchaseTickets($eventId: ID!, $quantity: Float!) {
    purchaseTickets(eventId: $eventId, quantity: $quantity) {
      id
      orderNumber
      quantity
      totalAmount
      status
      event {
        id
        name
        availableTickets
        isSoldOut
      }
    }
  }
`;

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen = ({ route, navigation }: Props) => {
  const { event } = route.params;
  const [quantity, setQuantity] = useState(1);

  const [purchaseTickets, { loading }] = useMutation(PURCHASE_TICKETS, {
    refetchQueries: [{ query: GET_EVENTS }],
    onError: (error) => {
      console.error('Mutation error:', error);
      Alert.alert('Error', error.message);
    },
  });

  const handlePurchase = async () => {
    try {
      const { data } = await purchaseTickets({
        variables: {
          eventId: event.id,
          quantity: quantity,
        },
      });

      if (data?.purchaseTickets) {
        navigation.navigate('OrderConfirmation', {
          order: data.purchaseTickets,
        });
      } else {
        Alert.alert('Error', 'Failed to complete purchase');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      Alert.alert('Error', error.message || 'Failed to purchase tickets');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>
        Date: {new Date(event.date).toLocaleDateString()}
      </Text>
      <Text style={styles.price}>Price: ${event.price}</Text>
      <Text style={styles.available}>
        Available Tickets: {event.availableTickets}
      </Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => quantity > 1 && setQuantity(q => q - 1)}
          style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
          disabled={quantity <= 1}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => quantity < event.availableTickets && setQuantity(q => q + 1)}
          style={[styles.quantityButton, quantity >= event.availableTickets && styles.disabledButton]}
          disabled={quantity >= event.availableTickets}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Total: ${(event.price * quantity).toFixed(2)}</Text>

      <TouchableOpacity
        style={[
          styles.purchaseButton,
          (loading || event.isSoldOut || event.availableTickets < quantity) && styles.disabled
        ]}
        onPress={handlePurchase}
        disabled={loading || event.isSoldOut || event.availableTickets < quantity}
      >
        <Text style={styles.purchaseButtonText}>
          {loading ? 'Processing...' : event.isSoldOut ? 'Sold Out' : 'Purchase Tickets'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  available: {
    fontSize: 16,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default EventDetailsScreen; 