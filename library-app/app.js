const modal = document.getElementById("add-modal");
const inputName = document.querySelector(".input-name");
const inputAuthor = document.querySelector(".input-author");
const inputYear = document.querySelector(".input-year");
const errorName = document.querySelector(".error-name");
const errorAuthor = document.querySelector(".error-author");
const errorYear = document.querySelector(".error-year");

let books = JSON.parse(localStorage.getItem("books")) || [];
books.forEach(renderBook);

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const itemBook = e.target.closest(".item-book");
    const id = Number(itemBook.id);

    books = books.filter((b) => b.id !== id);
    localStorage.setItem("books", JSON.stringify(books));

    itemBook.remove();
  }
});

function openBtn() {
  const openBtn = document.querySelector(".open-modal-btn");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
}

function closeModal() {
  const close = document.querySelector(".close-modal");
  const addModalConteiner = document.querySelector(".add-modal-conteiner");

  close.addEventListener("click", () => {
    modal.style.display = "none";

    resetError();
    resetInput();
  });

  addModalConteiner.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";

    resetError();
    resetInput();
  });
}

function addBtn() {
  const addBtn = document.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {
    resetError();

    if (inputName.value.trim() === "") {
      errorName.textContent = "Поле з назвою  пусте!";
      errorName.style.display = "flex";
      inputName.focus();
    } else if (inputAuthor.value.trim() === "") {
      errorAuthor.textContent = "Поле з ім'ям автором  пусте!";
      errorAuthor.style.display = "flex";
      inputAuthor.focus();
    } else if (inputYear.value.trim() === "") {
      errorYear.textContent = "Поле з датою  пусте!";
      errorYear.style.display = "flex";
      inputYear.focus();
    } else {
      const newBook = {
        id: Date.now(),
        name: inputName.value.trim(),
        author: inputAuthor.value.trim(),
        year: inputYear.value.trim(),
      };

      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));

      renderBook(newBook);

      resetInput();

      modal.style.display = "none";
    }
  });
}

function renderBook(book) {
  const bookList = document.querySelector(".book-List");

  if (bookList) {
    bookList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="item-book" id="${book.id}">
      <img alt="картинка книги" src="/public/no_cover_available.png" />
      <h2>${book.name}</h2>
      <p>${book.author}</p>
      <p>${book.year}</p>
      <button type="button" class="delete-btn">Видалити</button>
      </li>`
    );
  }
}

function resetInput() {
  [inputName, inputAuthor, inputYear].forEach((el) => (el.value = ""));
}

function resetError() {
  [errorName, errorAuthor, errorYear].forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
}

openBtn();
closeModal();
addBtn();
