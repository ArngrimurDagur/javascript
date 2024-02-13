// Selectors
document.querySelector("form").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", handleClickDeleteOrCheck);
document.getElementById("clearAll").addEventListener("click", handleClearAll);

let totalPrice = 0;
let totalField = document.getElementById('totalPrice');

// localStorage
let data = JSON.parse(localStorage.getItem('todoList'));
if (data) {
    data.forEach(item => {
        addTodo(item.todo, item.price);
        totalPrice += Number(item.price);
    });
    totalField.textContent = `Total Price: ${totalPrice}kr`;
}

// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let inputTask = document.querySelector('input[type="text"]');
    let inputPrice = document.querySelector('input[type="number"]');
    if (inputTask.value != "" && inputPrice.value != "") {
        addTodo(inputTask.value, inputPrice.value);
        totalPrice += Number(inputPrice.value); 
        totalField.textContent = `Total Price: ${totalPrice}kr`; 
        saveToLocalStorage(inputTask.value, inputPrice.value);
    }
    inputTask.value = "";
    inputPrice.value = "";
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == "checkButton")
        checkTodo(e);
    if (e.target.name == "deleteButton") {
        let price = e.target.parentNode.querySelector('.todo-item').textContent.split(': ')[1].slice(0, -2); 
        totalPrice -= Number(price); 
        totalField.textContent = `Total Price: ${totalPrice}kr`; 
        removeFromLocalStorage(e.target.parentNode.querySelector('.todo-item').textContent.split(': ')[0]);
        deleteTodo(e);
    }
}

function handleClearAll(e) {
    document.querySelector("ul").innerHTML = "";
    totalPrice = 0; 
    totalField.textContent = `Total Price: ${totalPrice}kr`; 
    localStorage.removeItem('todoList'); 
}

// Helpers
function addTodo(todo, price) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="todo-item">${todo}: ${price}kr</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;

    li.classList.add("todo-list-item");
    ul.appendChild(li);
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == "line-through")
        item.style.textDecoration = "none";
    else
        item.style.textDecoration = "line-through";
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    item.remove();
}

// LocalStorage functions
function saveToLocalStorage(todo, price) {
    let data = JSON.parse(localStorage.getItem('todoList')) || [];
    data.push({todo, price});
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeFromLocalStorage(todo) {
    let data = JSON.parse(localStorage.getItem('todoList'));
    let newData = data.filter(item => item.todo !== todo);
    localStorage.setItem('todoList', JSON.stringify(newData));
}
