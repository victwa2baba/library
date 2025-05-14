(() => {
  const myLibrary = JSON.parse(localStorage.getItem('library')) || []; 


const addButton = document.querySelector('#addBook');
const form = document.querySelector('#bookForm');
const bookTable = document.querySelector('.tableJs');
const bookHeader = document.querySelector('.bookHeaderJs');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const tbodyJs = document.querySelector('.tbodyJs');

addButton.addEventListener('click', () => {
    addButton.textContent = addButton.textContent === 'Add Book' ? 'Close' : 'Add Book';
    form.classList.toggle('d-none');
});

class Book {
  constructor(id, title, author, pages, read) {
    this.id= id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}


const clearForm = () => {
  title.value = '';
  author.value = '';
  pages.value = '';
}

function addBookToLibrary() {
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
  event.preventDefault();
  form.classList.add('d-none');
  addButton.textContent = 'Add Book';
  const book = createBook();
  addBookToArray(book);
  updateTable();
  updateLocalStorage(); 
  clearForm();
}

function createBook() {
  const id = crypto.randomUUID();
  const read = document.querySelector('input[name="read"]').checked;

  return new Book(id, title.value, author.value, pages.value, read);
}

function addBookToArray(book) {
  myLibrary.push(book);
}

function updateTable() {
    tbodyJs.innerHTML = ''; 
   
    myLibrary.forEach((book, index) => {
      const newTr = document.createElement('tr');
      const newTh = document.createElement('th');
      newTh.setAttribute('scope', 'row');
      const newTd = document.createElement('td');
      const newTd2 = document.createElement('td');
      const newTd3 = document.createElement('td');
      const newTd4 = document.createElement('td');
      const newTd5 = document.createElement('td');
      const readButton = document.createElement('button');
      readButton.setAttribute('type', 'button');
      readButton.classList.add('btn');
      if (book.read === true) {
        readButton.classList.add('btn-success');
        readButton.classList.remove('btn-danger');
      } else {
        readButton.classList.add('btn-danger');
        readButton.classList.remove('btn-success');
      }
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('type', 'button');
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteButton.dataset.id = book.id;
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        const bookId = deleteButton.dataset.id;
        const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
        if (bookIndex !== -1) {
          myLibrary.splice(bookIndex, 1);
        } 
        updateTable();
        updateLocalStorage();
      });

      readButton.addEventListener('click', () => {
        if (book.read === true) {
          book.read = false;
          readButton.textContent = 'Not Read';
          readButton.classList.remove('btn-success');
          readButton.classList.add('btn-danger');
          updateLocalStorage();
        } else {
          book.read = true;
          readButton.textContent = 'Read';
          readButton.classList.remove('btn-danger');
          readButton.classList.add('btn-success');
          updateLocalStorage();
        }
        console.log(`Read button clicked for book: ${book.title} (ID: ${book.id})`);
      })

      newTh.textContent = index + 1;
      newTd.textContent = book.title;
      newTd2.textContent = book.author;
      newTd3.textContent = book.pages;
      readButton.textContent = book.read ? 'Read' : 'Not Read';

      tbodyJs.appendChild(newTr);
      newTr.appendChild(newTh);
      newTr.appendChild(newTd);
      newTr.appendChild(newTd2);
      newTr.appendChild(newTd3);
      newTr.appendChild(newTd4);
      newTr.appendChild(newTd5);
      newTd4.appendChild(readButton);
      newTd5.appendChild(deleteButton);

      
    });
};

addBookToLibrary();
updateTable();

function updateLocalStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}
})();