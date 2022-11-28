let newBookForm = document.getElementById("new-book-form");
let newBookButton = document.getElementById("new-book-button");

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

let myLibrary = [];

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
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
  myLibrary.push(book);
  addBookToTable(book);
}

function addBookToTable(book)
{
  let table = document.getElementById("books-table").getElementsByTagName('tbody')[0];

  let row = table.insertRow(-1);
  let id = myLibrary.findIndex((element) => element.title === book.title);
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
  myLibrary.splice(id, 1);

  let table = document.getElementById("books-table").getElementsByTagName('tbody')[0];
  table.innerHTML = "";
  UpdateTable();

}

function changeReadStatus(button)
{
  let id = button.parentElement.parentElement.dataset.id;
  if (myLibrary[id].read === true) myLibrary[id].read = false;
  else myLibrary[id].read = true;

  button.parentElement.parentElement.childNodes[3].innerHTML = myLibrary[id].read;
}

function UpdateTable()
{
  myLibrary.forEach(element => {
    addBookToTable(element);
  });
}

addBookToLibrary(new Book("J.K. Rowling", "Harry Potter", 552, true, "Didn't like"));
addBookToLibrary(new Book("Michael A. Stackpole", "Prince of Havoc", 477, true, "Amazing final"));