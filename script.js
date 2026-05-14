const myLibrary = [];
const openDialogBtn = document.querySelector('#openDialogBtn');
const myDialog = document.querySelector('#myDialog');
const submitBtn = document.querySelector('#submitBtn');
const closeDialogBtn = document.querySelector('#closeDialogBtn');

openDialogBtn.addEventListener('click', () => {
    myDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    myDialog.close();
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const title = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#bookAuthor').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#readStatus').value === 'read';

    addBookToLibrary(id, title, author, pages, read);
    displayBooks();
    myDialog.close();
    myDialog.querySelector('form').reset();
});

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(id, title, author, pages, read) {
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}

function deleteBook(bookId) {
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }
}

function toggleReadStatus(bookId) {
    const book = myLibrary.find((item) => item.id === bookId);

    if (book) {
        book.read = !book.read;
    }
}

function displayBooks() {
    const bookContainer = document.querySelector('.bookshelf');
    bookContainer.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
            <button class="toggle-read-btn" data-id="${book.id}">
                ${book.read ? 'Mark as Unread' : 'Mark as Read'}
            </button>
            <button class="delete-btn" data-id="${book.id}">Delete</button>
        `;

        bookContainer.appendChild(bookCard);
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-id');
            deleteBook(bookId);
            displayBooks();
        });
    });

    const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
    toggleReadButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-id');
            toggleReadStatus(bookId);
            displayBooks();
        });
    });
}

function loadStarterBooks() {
    addBookToLibrary(crypto.randomUUID(), 'The Hobbit', 'J.R.R. Tolkien', 310, true);
    addBookToLibrary(crypto.randomUUID(), 'Dune', 'Frank Herbert', 412, false);
    addBookToLibrary(crypto.randomUUID(), '1984', 'George Orwell', 328, true);
}

document.addEventListener('DOMContentLoaded', () => {
    loadStarterBooks();
    displayBooks();
});
