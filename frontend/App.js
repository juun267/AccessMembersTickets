import React, { useState } from 'react';
import { Text, View, Button, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation, gql } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Configure Apollo Client (update URI as needed)
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Use your backend URL or tunnel URL for mobile testing
  cache: new InMemoryCache(),
});

// GraphQL Queries/Mutations
const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      name
      date
      availableTickets
    }
  }
`;

const PURCHASE_TICKETS = gql`
  mutation PurchaseTickets($purchaseTicketInput: PurchaseTicketInput!) {
    purchaseTickets(purchaseTicketInput: $purchaseTicketInput) {
      id
      orderNumber
      ticketsPurchased
      event {
        id
        name
      }
    }
  }
`;

// Screens

function EventList({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_EVENTS);

  if (loading) return <Text>Loading events...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <FlatList
        data={data.events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.eventItem} 
            onPress={() => navigation.navigate('Purchase', { event: item, refetchEvents: refetch })}
          >
            <Text style={styles.eventName}>{item.name}</Text>
            <Text>Date: {new Date(item.date).toLocaleString()}</Text>
            <Text>{item.availableTickets > 0 ? `${item.availableTickets} tickets available` : 'Sold Out'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function PurchaseScreen({ route, navigation }) {
  const { event, refetchEvents } = route.params;
  const [tickets, setTickets] = useState('1');
  const [purchaseTickets, { loading, error }] = useMutation(PURCHASE_TICKETS);

  const handlePurchase = async () => {
    try {
      const ticketCount = parseInt(tickets);
      if (ticketCount > event.availableTickets) {
        alert('Not enough tickets available');
        return;
      }
      const res = await purchaseTickets({
        variables: { purchaseTicketInput: { eventId: event.id, tickets: ticketCount } }
      });
      // Refetch events to update available tickets
      refetchEvents();
      navigation.navigate('Confirmation', { order: res.data.purchaseTickets });
    } catch (err) {
      console.error(err);
      alert('Error purchasing tickets');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Purchase Tickets for {event.name}</Text>
      <Text>Available Tickets: {event.availableTickets}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={tickets}
        onChangeText={setTickets}
        placeholder="Enter number of tickets"
      />
      <Button title="Purchase" onPress={handlePurchase} disabled={loading} />
      {error && <Text style={{ color: 'red' }}>Error purchasing tickets</Text>}
    </View>
  );
}

function ConfirmationScreen({ route, navigation }) {
  const { order } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Confirmation</Text>
      <Text>Order Number: {order.orderNumber}</Text>
      <Text>Event: {order.event.name}</Text>
      <Text>Tickets Purchased: {order.ticketsPurchased}</Text>
      <Button title="Back to Events" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EventList">
          <Stack.Screen name="EventList" component={EventList} options={{ title: 'Events' }} />
          <Stack.Screen name="Purchase" component={PurchaseScreen} options={{ title: 'Purchase Tickets' }} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Confirmation' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  eventItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  eventName: { fontSize: 16, fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 12, padding: 8 },
});
