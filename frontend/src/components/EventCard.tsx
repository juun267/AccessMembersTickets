import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

const EventCard = ({ event, onPress }: EventCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>{new Date(event.date).toLocaleDateString()}</Text>
        <Text style={styles.price}>${event.price}</Text>
        <Text style={styles.tickets}>
          {event.isSoldOut ? 'SOLD OUT' : `${event.availableTickets} tickets available`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  tickets: {
    color: '#444',
    marginTop: 5,
  },
});

export default EventCard; 