const modal = document.getElementById("add-modal");
const inputName = document.querySelector(".input-name");
const inputAuthor = document.querySelector(".input-author");
const inputYear = document.querySelector(".input-year");
const errorName = document.querySelector(".error-name");
const errorAuthor = document.querySelector(".error-author");
const errorYear = document.querySelector(".error-year");
const bookList = document.querySelector(".book-List");

let books = JSON.parse(localStorage.getItem("books")) || [];
books.forEach(renderBook);

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const itemCard = e.target.closest(".item-card");
    const id = Number(itemCard.id);

    books = books.filter((b) => b.id !== id);
    localStorage.setItem("books", JSON.stringify(books));

    itemCard.remove();
  }
});

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("checked-read")) {
    const itemCard = e.target.closest(".item-card");
    const id = Number(itemCard.id);

    let book = books.find((b) => b.id === id);

    if (book) {
      book.checked = !book.checked;
      localStorage.setItem("books", JSON.stringify(books));
    }
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
        checked: false,
      };

      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));

      renderBook(newBook);

      resetInput();

      modal.style.display = "none";
    }
  });
}

function filter() {
  const filterReadSelect = document.querySelector(".filter-read-option");
  const filterAlfSelect = document.querySelector(".filter-alf-option");

  function applyFilters() {
    let filterBooks = JSON.parse(localStorage.getItem("books")) || [];

    if (filterReadSelect.value === "filter2") {
      filterBooks = filterBooks.filter((b) => b.checked === false);
    } else if (filterReadSelect.value === "filter3") {
      filterBooks = filterBooks.filter((b) => b.checked === true);
    }

    if (filterAlfSelect.value === "filter2") {
      filterBooks = filterBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterAlfSelect.value === "filter3") {
      filterBooks = filterBooks.sort((a, b) => b.name.localeCompare(a.name));
    }
    bookList.innerHTML = "";

    filterBooks.forEach(renderBook);
  }

  filterReadSelect.addEventListener("change", applyFilters);
  filterAlfSelect.addEventListener("change", applyFilters);
}

function renderBook(book) {
  if (bookList) {
    bookList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="item-card" id="${book.id}">
      <label class="read-card">Прчитано: 
      <input class="checked-read" type="checkbox" ${
        book.checked ? "checked" : ""
      }/>
      </label>
        <img alt="картинка книги" src="./public/no_cover_available.png" />
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

function imgBtnChange() {
  const btn = document.querySelector(".open-modal-btn");

  btn.addEventListener("mouseover", () => {
    btn.innerHTML = `Додати книгу
          <img
            class="open-modal-btn-img"
            src="./library-app/icons/add-solid.svg"
            alt="add book"
          />`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.innerHTML = `Додати книгу
          <img
            class="open-modal-btn-img"
            src="./library-app/icons/add-outline.svg"
            alt="add book"
          />`;
  });
}

openBtn();
closeModal();
addBtn();
filter();
imgBtnChange();
