-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS events;

-- Create events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    total_tickets INTEGER NOT NULL CHECK (total_tickets >= 0),
    available_tickets INTEGER NOT NULL CHECK (available_tickets >= 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    is_sold_out BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(255) NOT NULL UNIQUE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_orders_event_id ON orders(event_id);
CREATE INDEX idx_events_date ON events(date);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for both tables
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample events with all required fields
INSERT INTO events (
    name,
    description,
    date,
    total_tickets,
    available_tickets,
    price,
    is_sold_out
) VALUES
(
    'Summer Music Festival',
    'A fantastic day of live music featuring top artists from around the world.',
    '2024-07-15 14:00:00',
    1000,
    1000,
    99.99,
    false
),
(
    'Tech Conference 2024',
    'Annual technology conference featuring the latest innovations and industry leaders.',
    '2024-09-20 09:00:00',
    500,
    500,
    299.99,
    false
),
(
    'Food & Wine Expo',
    'Explore culinary delights and wine tastings from renowned chefs and wineries.',
    '2024-06-01 11:00:00',
    300,
    300,
    150.00,
    false
),
(
    'Comedy Night Special',
    'An evening of laughter with top stand-up comedians.',
    '2024-05-10 20:00:00',
    200,
    200,
    45.00,
    false
),
(
    'Business Leadership Summit',
    'Connect with industry leaders and learn about the future of business.',
    '2024-08-05 10:00:00',
    400,
    400,
    399.99,
    false
);

-- Insert sample orders (commented out - uncomment if you want sample orders)
/*
INSERT INTO orders (order_number, event_id, quantity, total_amount) 
SELECT 
    'ORD-' || floor(random() * 1000000)::text,
    id,
    floor(random() * 5 + 1)::int,
    price * floor(random() * 5 + 1)
FROM events
LIMIT 3;

-- Update available tickets for events with orders
UPDATE events e
SET available_tickets = total_tickets - (
    SELECT COALESCE(SUM(quantity), 0)
    FROM orders
    WHERE event_id = e.id
);

-- Update is_sold_out flag
UPDATE events
SET is_sold_out = (available_tickets = 0);
*/ 