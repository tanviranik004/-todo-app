//import Todo Class
import { Todo } from "./classes/Todo.js";


//Find Class and ID

//const container =document.querySelector(".container");
const todoForm =document.querySelector(".todo-form");
const todoInput =document.querySelector("#inputTodo");
//const todoAddButton =document.querySelector("#addTodoButton");
const todoLists =document.querySelector("#lists");
const messageElement =document.querySelector("#message");

//showMessage

const showMessage = (text,status)=>{
    messageElement.textContent =text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
       messageElement.textContent =""; 
       messageElement.classList.remove(`bg-${status}`);
    },1000);
};



//createTodo

const createTodo = (newTodo) => {
    const todoElement = document.createElement("li");
    todoElement.id =newTodo.todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML=`
        <span>${newTodo.todoValue}</span>
        <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;
    todoLists.appendChild(todoElement);
    const deleteButton =todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);
};


//deleteTodo 

const deleteTodo =(event) =>{
    //console.log("deleteTodo");
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    //console.log(selectedTodo);
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is Deleted","danger");
    //const todoId = selectedTodo.id;
    let todos =getTodoFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !==selectedTodo.id);
    localStorage.setItem("mytodos",JSON.stringify(todos));

}


//getTodoFromLocalStorage
const getTodoFromLocalStorage=() => {
   return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];

}



// Create addTodo Function for AddTodo

    const addTodo =(event)=>{
        event.preventDefault();
        const todoValue = todoInput.value;
       //console.log(todoInput.value); 

 // Create unique id
       const todoId=Date.now().toString();
      // console.log(todoId);


 //createTodo
        const newTodo = new Todo(todoId,todoValue);
        //console.log(newTodo);
        //createTodo(todoId,todoValue);
        createTodo(newTodo);
        showMessage("Todo is added successfully","success");


 //adding todo to localStorage
      const todos= getTodoFromLocalStorage()
      todos.push(newTodo);
      localStorage.setItem("mytodos",JSON.stringify(todos));
      todoInput.value="";
    };
//adding todo to localStorage

 //load Todos
    const loadTodos = () =>{
        const todos = getTodoFromLocalStorage();
        todos.map((todo) => createTodo(todo));
        //console.log("loaded")
    };
//load Todos



//adding listeners with form;
todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);
//add listeners with form



// todoForm.addEventListener("submit",(event)=>{
//     event.preventDefault();
//     console.log(todoInput.value);
// })
