// import { IRouter, inject } from "aurelia";
// import { Book } from "../book/book";
// import { BookServiceBackend } from '../../services/backend/book-service';

// @inject(BookServiceBackend, IRouter)
// export class Books {
//     public books: Book[] = [];

//     public constructor(private bookService: BookServiceBackend) { }

//     afterAttach() {
//         this.books = this.bookService.getBooks();
//     }

//     // canEnter(params: any) {
//     //     console.log("Books: canEnter", params);
//     //     return true;
//     // }
// }