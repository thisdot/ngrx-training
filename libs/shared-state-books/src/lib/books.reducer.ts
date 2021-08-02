import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

export const reducer = createReducer(
  initialState,
  on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, (state) => {
    return {
      ...state,
      activeBookId: null,
    };
  }),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId,
    };
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books,
    };
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      collection: createBook(state.collection, action.book),
      activeBookId: null,
    };
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      collection: updateBook(state.collection, action.book),
      activeBookId: null,
    };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId),
    };
  })
);

export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) =>
    books.find((book) => book.id === activeBookId) || null
);
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
