 const title = document.querySelector("#title"),
     author = document.querySelector("#author"),
     isbn = document.querySelector("#isbn");


 title.addEventListener('input', function (e) {
     e.target.className = 'validate';
 });

 author.addEventListener("input", function (e) {
     e.target.className = "validate";
 });

isbn.addEventListener("input", function (e) {
     e.target.className = "validate";
 });


 class Book {
     constructor(title, author, isbn) {
         this.title = title;
         this.author = author;
         this.isbn = isbn;
     }
 }

 // class Modal {
 //     static answer() {

 //         document.querySelector('#modal1').addEventListener('click', function (e) {
 //             let answer = e.target.id;
 //             let answer;
 //             if (e.target.id === 'modal-yes-btn') {
 //                 answer = e.target.textContent;
 //             } else if (e.target.id === 'modal-no-btn') {
 //                 answer = e.target.textContent;
 //             }
 //             return answer;
 //         });


 //     }
 // }


 class UI {

     addBookToList(book) {
         const tableRow = document.createElement('tr');
         tableRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a data-target="modal1" class="delete" href="#">&Cross;</a></td>
        `;

         document.querySelector('#table-list').appendChild(tableRow);
     }

     clearFormData() {

         document.querySelector("#title").value = '';
         document.querySelector("#title").className = '';

         document.querySelector("#author").value = '';
         document.querySelector("#author").className = '';

         document.querySelector("#isbn").value = '';
         document.querySelector("#isbn").className = '';

     }

     displayAlert(message, color) {
         const alertDiv = document.querySelector('#alert');
         const alertBox = document.createElement('div');

         alertBox.className = `card-panel ${color} white-text z-depth-0 lighten-1`;

         alertBox.appendChild(document.createTextNode(message));

         alertDiv.appendChild(alertBox);

         setTimeout(function () {
             alertBox.remove();
         }, 3000);


         // <div class="card-panel teal lighten-2">
         //   This is a card panel with a teal lighten-2 class
         // </div>;
     }

     removeBookList(target) {


         const ui = new UI();
         target.parentElement.parentElement.remove();
         Store.removeBook(target.parentElement.previousElementSibling.textContent);
         ui.displayAlert("Book Removed", "green");

     }








 }

 class Store {
     static getBooks() {
         let books;
         if (localStorage.getItem("books") === null) {
             books = [];
         } else {
             books = JSON.parse(localStorage.getItem("books"));
         }

         return books;
     }

     static addBook(book) {
         let books = Store.getBooks();
         books.push(book);
         localStorage.setItem("books", JSON.stringify(books));
     }

     static removeBook(isbn) {
         let books = Store.getBooks();

         books.forEach(function (book, index) {
             if (book.isbn === isbn) {
                 books.splice(index, 1);
             }
         });
         localStorage.setItem("books", JSON.stringify(books));
     }
 }

 document.querySelector('#book-form').addEventListener('submit', function (e) {

     const ui = new UI();

     if (title.value === "" || author.value === "" || isbn.value === "") {

         ui.displayAlert('Please Enter Value In All Input Fields', 'red');

     } else {

         const book = new Book(title.value, author.value, isbn.value);



         ui.addBookToList(book);

         ui.displayAlert("Book Added", "green");

         Store.addBook(book);

         ui.clearFormData();
     }



     e.preventDefault();
 });


 document.querySelector('#table-list').addEventListener('click', function (e) {



     if (e.target.className === 'delete') {
         const newTarget = e.target;
         modalInstance(newTarget);





     }

     // ui.removeBookList(e.target);


 });


 document.addEventListener('DOMContentLoaded', function () {
     let books = Store.getBooks();

     books.forEach(function (book) {
         const ui = new UI();
         ui.addBookToList(book);
     });


 });






 // if (e.target.id === 'modal-yes-btn') {
 //     answer = e.target.textContent;
 // } else if (e.target.id === 'modal-no-btn') {
 //     answer = e.target.textContent;
 // }




 //  let modalYesButton = document.querySelector("#modal-yes-btn");
 //    const ui = new UI();
 //    modalYesButton.addEventListener("click", function(e) {
 //      if (e.target.textContent === "Yes") {
 //        if (target.className === "delete modal-trigger") {
 //          target.parentElement.parentElement.remove();
 //          Store.removeBook(target.parentElement.previousElementSibling.textContent);
 //          ui.displayAlert("Book Removed", "green");
 //        }
 //      }
 //    });


 // document.querySelector('#modal1 #modal-yes-btn').addEventListener('click', function (e) {


 //     if (e.target.textContent === 'Yes') {

 //         console.log(123);
 //     }

 //     e.preventDefault();



 // });

 function modalInstance(newTarget) {
     let newModal = document.createElement('div');
     newModal.className = "modal";
     newModal.id = "modal1";
     newModal.innerHTML = ` 
        <div class="modal-content">
            <h4>Delete Book</h4>
            <p>Are You Sure You Want To Delete Book?</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect btn blue lighten-1 z-depth-0">Yes</a>
            <a href="#!" class="modal-action modal-close waves-effect btn blue lighten-1 z-depth-0">No</a>
        </div>
    `;


     document.body.appendChild(newModal);

     let elem = document.querySelector(".modal");

     let instance = M.Modal.init(elem, {
         dismissible: false
     });


     instance.open();


     elem.addEventListener('click', function (e) {
         if (e.target.textContent === 'Yes') {

             instance.close();
             instance.destroy();

             document.body.removeChild(newModal);

             const ui = new UI();

             ui.removeBookList(newTarget);



         } else {
             instance.close();
             instance.destroy();
             document.body.removeChild(newModal);
         }

     });


 }