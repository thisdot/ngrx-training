import { Component } from '@angular/core';

@Component({
  selector: 'book-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NgRx Workshop';
  links = [{ path: '/books', icon: 'book', label: 'Books' }];
}
