import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { EventsService } from '../events/events.service';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;
  let eventsService: EventsService;

  const mockEvent = {
    id: '1',
    name: 'Test Event',
    description: 'Test Description',
    date: new Date(),
    totalTickets: 100,
    availableTickets: 100,
    price: 50.00,
    isSoldOut: false,
  };

  const mockOrder = {
    id: '1',
    orderNumber: 'ORD-123',
    event: mockEvent,
    quantity: 2,
    totalAmount: 100.00,
    status: 'completed',
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockOrder),
    save: jest.fn().mockResolvedValue(mockOrder),
    find: jest.fn().mockResolvedValue([mockOrder]),
    findOne: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockEventsService = {
    findOne: jest.fn().mockResolvedValue(mockEvent),
    updateAvailableTickets: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockRepository,
        },
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = await service.findAll();
      expect(orders).toEqual([mockOrder]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const order = await service.findOne('1');
      expect(order).toEqual(mockOrder);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const order = await service.createOrder('1', 2);
      expect(order).toEqual(mockOrder);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(eventsService.updateAvailableTickets).toHaveBeenCalled();
    });

    it('should throw error if event not found', async () => {
      mockEventsService.findOne.mockResolvedValueOnce(null);
      await expect(service.createOrder('1', 2)).rejects.toThrow(BadRequestException);
    });

    it('should throw error if not enough tickets', async () => {
      mockEventsService.findOne.mockResolvedValueOnce({
        ...mockEvent,
        availableTickets: 1,
      });
      await expect(service.createOrder('1', 2)).rejects.toThrow(BadRequestException);
    });
  });
}); 