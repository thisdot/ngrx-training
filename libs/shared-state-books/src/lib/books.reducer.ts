import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
}

export const adapter = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
  activeBookId: null,
});

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
    return adapter.setAll(action.books, state);
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return adapter.addOne(action.book, {
      ...state,
      activeBookId: null,
    });
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return adapter.updateOne(
      { id: action.book.id, changes: action.book },
      {
        ...state,
        activeBookId: null,
      }
    );
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return adapter.removeOne(action.bookId, state);
  })
);

export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (booksEntities, activeBookId) => {
    if (activeBookId) return booksEntities[activeBookId] ?? null;

    return null;
  }
);
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
