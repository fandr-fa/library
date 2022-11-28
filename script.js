class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

class Library {

  books = [];

  authorElement = document.getElementById("author");
  titleElement =  document.getElementById("title");
  pagesElement = document.getElementById("pages");
  readElement = document.getElementById("read");

  tableElement = document.getElementById("books-table").getElementsByTagName('tbody')[0];

  constructor() {
    document.getElementById("submit").addEventListener('click', this.submitNewBookToLibrary);
    document.getElementById("new-book-button").addEventListener('click', this.expandNewBookSection);
  }

  expandNewBookSection()
  {
    var collapsableDiv = document.getElementById("collapsableDiv");
    if (collapsableDiv.clientHeight)
    {
      collapsableDiv.style.height = 0;
    }
    else
    {
      let wrapper = document.querySelector(".wrapper");
      collapsableDiv.style.height = wrapper.clientHeight + "px";
    }
  }

  clearNewBookForm()
  {
    this.authorElement.value = "";
    this.titleElement.value = "";
    this.pagesElement.value = "";
    this.readElement.checked = false;
  }

  submitNewBookToLibrary() {
    let author = library.authorElement.value;
    let title = library.titleElement.value;
    let pages = library.pagesElement.value;
    let read = library.readElement.checked;
    let newBook = new Book(author, title, pages, read);
    library.clearNewBookForm();
    library.addBook(newBook);
  }

  addBook(book) {
    this.books.push(book);

    this.addBookToTable(book);
  }

  addBookToTable(book)
  {
    let table = document.getElementById("books-table").getElementsByTagName('tbody')[0];

    let row = table.insertRow(-1);
    let id = library.getBookId(book.title);
    row.dataset.id = id;

    let cellAuthor = row.insertCell(0);
    cellAuthor.classList.add("column-author");
    cellAuthor.innerHTML = book.author;

    let cellTitle = row.insertCell(1);
    cellTitle.classList.add("column-title");
    cellTitle.innerHTML = book.title;

    let cellPages = row.insertCell(2);
    cellPages.classList.add("column-pages");
    cellPages.innerHTML = book.pages;

    let cellRead = row.insertCell(3);
    cellRead.classList.add("column-read");
    cellRead.innerHTML = book.read;

    let cellReadButton = row.insertCell(4);
    cellReadButton.classList.add("column-check");
    const newReadButton = document.createElement("button");
    newReadButton.addEventListener('click', this.changeReadStatusClick);
    newReadButton.textContent = "Read";
    cellReadButton.appendChild(newReadButton);

    let cellDeleteButton = row.insertCell(5);
    cellDeleteButton.classList.add("column-delete");
    const newDeleteButton = document.createElement("button");
    newDeleteButton.addEventListener('click', this.removeBookClick);
    newDeleteButton.textContent = "Delete";
    cellDeleteButton.appendChild(newDeleteButton);
  }

  getBookId(title) {
    return this.books.findIndex((book) => book.title === title);
  }

  getReadStatus(bookId) {
    return this.books[bookId].read;
  }

  UpdateTable()
  {
    this.tableElement.innerHTML = "";

    library.books.forEach(book => {
      this.addBookToTable(book);
    });
  }

  changeReadStatusClick(event)
  {
    let newReadStatus = library.changeReadStatus(event.currentTarget.parentElement.parentElement.dataset.id);

    event.currentTarget.parentElement.parentElement.childNodes[3].innerHTML = newReadStatus;
  }

  changeReadStatus(bookId) {
    if (this.books[bookId].read === true) {
      this.books[bookId].read = false;
    }
    else {
      this.books[bookId].read = true;
    }

    return this.books[bookId].read;
  }

  removeBookClick(event)
  {
    library.removeBook(event.currentTarget.parentElement.parentElement.dataset.id);
  }

  removeBook(bookId) {
    this.books.splice(bookId, 1);

    this.UpdateTable();
  }

}

const library = new Library();

library.addBook(new Book("J.K. Rowling", "Harry Potter", 552, true, "Didn't like"));
library.addBook(new Book("Michael A. Stackpole", "Prince of Havoc", 477, true, "Amazing final"));