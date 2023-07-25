const inputbox = document.getElementById('inputbox');
const addbtn = document.getElementById('addbtn');
const todolist = document.getElementById('todolist');

let edittodo = null;

const addTodo = () => {
    const inputtext = inputbox.value.trim();
    if (inputtext.length <= 0) {
        alert("You must write somethings");
        return false;
    }

    if (addbtn.value === "Edit") {
        editLocaltodos(edittodo.target.previousElementSibling.innerHTML);
        edittodo.target.previousElementSibling.innerHTML = inputtext;

        addbtn.value = "Add";
        inputbox.value = "";
    }
    else {
        const li = document.createElement("li")
        const p = document.createElement("p")
        p.innerHTML = inputtext;
        li.appendChild(p);

        const editbtn = document.createElement("button")
        editbtn.innerText = "Edit";
        editbtn.classList.add("btn", "editbtn");
        li.appendChild(editbtn);

        const deletebtn = document.createElement("button")
        deletebtn.innerText = "Remove";
        deletebtn.classList.add("btn", "deletebtn");
        li.appendChild(deletebtn);

        todolist.appendChild(li);
        inputbox.value = "";

        saveLocaltodos(inputtext);

    }



}


const updatetodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todolist.removeChild(e.target.parentElement);
        deleteLocaltodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";
        edittodo = e;
    }




}

const saveLocaltodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

const getLocaltodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.innerHTML = todo;
            li.appendChild(p);

            const editbtn = document.createElement("button")
            editbtn.innerText = "Edit";
            editbtn.classList.add("btn", "editbtn")
            li.appendChild(editbtn);

            const deletebtn = document.createElement("button")
            deletebtn.innerText = "Remove";
            deletebtn.classList.add("btn", "deletebtn");
            li.appendChild(deletebtn);

            todolist.appendChild(li);

        });
    }



}


const deleteLocaltodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    let todotext = todo.children[0].innerHTML;
    let todoindex = todos.indexOf(todotext);
    todos.splice(todoindex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));




}

const editLocaltodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoindex = todos.indexOf(todo);
    todos[todoindex] = inputbox.value;
    localStorage.setItem("todos", JSON.stringify(todos));



}
document.addEventListener('DOMContentLoaded', getLocaltodos);
addbtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updatetodo);

