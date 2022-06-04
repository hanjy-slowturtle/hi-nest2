import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('No Movie: 999');
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const beforeDeleteLength = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLength = service.getAll().length;
      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('No Movie: 999');
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      const beforeCreateLength = service.getAll().length;
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      service.update(1, {
        title: 'updated',
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('No Movie: 999');
      }
    });
  });
});
