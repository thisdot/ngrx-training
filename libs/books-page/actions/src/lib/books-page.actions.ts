import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from '@book-co/shared-models';

export const enter = createAction('[Books Page] Enter');

export const selectBook = createAction(
  '[Books Page] Select Book',
  props<{ bookId: string }>()
);

export const clearSelectedBook = createAction(
  '[Books Page] Clear Selected Book'
);

export const createBook = createAction(
  '[Books Page] Create Book',
  props<{ book: BookRequiredProps }>()
);

export const updateBook = createAction(
  '[Books Page] Update Book',
  props<{ bookId: string; changes: BookRequiredProps }>()
);

export const deleteBook = createAction(
  '[Books Page] Delete Book',
  props<{ bookId: string }>()
);
