import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should fetch events', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            events {
              id
              name
              description
              availableTickets
              price
            }
          }
        `,
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.events).toBeDefined();
        expect(Array.isArray(res.body.data.events)).toBeTruthy();
      });
  });

  it('should purchase tickets', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation($eventId: ID!, $quantity: Int!) {
            purchaseTickets(eventId: $eventId, quantity: $quantity) {
              id
              orderNumber
              quantity
              totalAmount
              status
            }
          }
        `,
        variables: {
          eventId: '1',
          quantity: 2,
        },
      })
      .expect(200)
      .expect(res => {
        expect(res.body.data.purchaseTickets).toBeDefined();
        expect(res.body.data.purchaseTickets.quantity).toBe(2);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
