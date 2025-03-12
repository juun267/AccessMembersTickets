import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';

describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

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

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockEvent]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    save: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const events = await service.findAll();
      expect(events).toEqual([mockEvent]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const event = await service.findOne('1');
      expect(event).toEqual(mockEvent);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('updateAvailableTickets', () => {
    it('should update available tickets and sold out status', async () => {
      const event = { ...mockEvent, availableTickets: 95 };
      mockRepository.findOne.mockResolvedValueOnce(event);
      mockRepository.save.mockResolvedValueOnce({ ...event, availableTickets: 90 });

      const result = await service.updateAvailableTickets('1', 5);
      expect(result.availableTickets).toBe(90);
      expect(repository.save).toHaveBeenCalled();
    });
  });
}); 