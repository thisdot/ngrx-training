export interface BookModel {
  id: string;
  name: string;
  earnings: number;
  description?: string;
}

export type BookRequiredProps = Pick<BookModel, 'name' | 'earnings'>;

export function calculateBooksGrossEarnings(books: BookModel[]) {
  return books.reduce((total, book) => {
    return total + parseInt(`${book.earnings}`, 10) || 0;
  }, 0);
}
