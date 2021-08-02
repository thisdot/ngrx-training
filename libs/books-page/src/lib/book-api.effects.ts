import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, exhaustMap, concatMap } from 'rxjs/operators';
import { BooksService } from '@book-co/shared-services';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

@Injectable()
export class BooksApiEffects {
  constructor(private booksService: BooksService, private actions$: Actions) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.enter),
      exhaustMap(() =>
        this.booksService
          .all()
          .pipe(map((books) => BooksApiActions.booksLoaded({ books })))
      )
    )
  );

  createBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap((action) =>
        this.booksService
          .create(action.book)
          .pipe(map((book) => BooksApiActions.bookCreated({ book })))
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap((action) =>
        this.booksService
          .update(action.bookId, action.changes)
          .pipe(map((book) => BooksApiActions.bookUpdated({ book })))
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap((action) =>
        this.booksService
          .delete(action.bookId)
          .pipe(
            map(() => BooksApiActions.bookDeleted({ bookId: action.bookId }))
          )
      )
    )
  );
}
