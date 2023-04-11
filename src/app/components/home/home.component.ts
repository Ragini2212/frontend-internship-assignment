import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, filter } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;

  isLoading: boolean = false;

  searchText: string = '';
  emptySearchBox: boolean = false;
  allBooks: Book[] = [];
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 0;
  offset: number = 0;

  constructor(private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {

    
    this.bookSearch.valueChanges
    .pipe(debounceTime(200))
    .subscribe((value: string) => {
      this.searchText = value
      });
  }

  searchBooks() {
    if(this.searchText?.length > 0) {
      this.emptySearchBox = false
      this.offset = this.pageIndex * 10;

      this.allBooks = []
      this.isLoading = true
      this.subjectsService
        .searchBooks(this.searchText, this.offset, this.pageSize)
        .subscribe((data: any) => {
          console.log(data);
          this.allBooks = data?.docs;
          this.length = data?.numFound
          this.isLoading = false
        });
    } else {
      this.emptySearchBox = true;
    }

    
  }

  handlePageEvent(event: PageEvent) {
    console.log(event)
    this.pageIndex = event.pageIndex;
    this.searchBooks()
  }
  
}
