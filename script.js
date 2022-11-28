function clearNewBookForm()
{
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").value = "";
}

function expandNewBookSection()
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

  addBook(book) {
    this.books.push(book);
  }

  removeBook(bookId) {
    this.books.splice(bookId, 1);
  }

  changeReadStatus(bookId) {
    if (this.books[bookId].read === true) {
      this.books[bookId].read = false;
    }
    else {
      this.books[bookId].read = true;
    }
  }

  getReadStatus(bookId) {
    return this.books[bookId].read;
  }

  getBookId(title) {
    return this.books.findIndex((book) => book.title === title);
  }

}

let submitButton = document.getElementById("submit");
submitButton.addEventListener('click', submitNewBookToLibrary);

function submitNewBookToLibrary() {
  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  let newBook = new Book(author, title, pages, read);
  addBookToLibrary(newBook);
  clearNewBookForm();
}

function addBookToLibrary(book)
{
  library.addBook(book);
  addBookToTable(book);
}

function addBookToTable(book)
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
  cellReadButton.innerHTML = `<button onclick="changeReadStatus(this)">Read</button>`;

  let cellDeleteButton = row.insertCell(5);
  cellDeleteButton.classList.add("column-delete");
  cellDeleteButton.innerHTML = `<button onclick="removeBookClick(this)">Delete</button>`;
}

function removeBookClick(button)
{
  let id = button.parentElement.parentElement.dataset.id;
  library.removeBook(id);

  let table = document.getElementById("books-table").getElementsByTagName('tbody')[0];
  table.innerHTML = "";
  UpdateTable();

}

function changeReadStatus(button)
{
  let id = button.parentElement.parentElement.dataset.id;
  library.changeReadStatus(id);


  button.parentElement.parentElement.childNodes[3].innerHTML = library.getReadStatus(id);
}

function UpdateTable()
{
  library.books.forEach(book => {
    addBookToTable(book);
  });
}

const library = new Library();

addBookToLibrary(new Book("J.K. Rowling", "Harry Potter", 552, true, "Didn't like"));
addBookToLibrary(new Book("Michael A. Stackpole", "Prince of Havoc", 477, true, "Amazing final"));