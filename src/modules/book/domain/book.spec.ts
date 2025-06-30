import { Book } from './book.domain';

describe('Book', () => {
  it('should be defined', () => {
    expect(new Book()).toBeDefined();
  });
});
