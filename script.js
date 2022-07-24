//Find Class and ID
const container =document.querySelector(".container");
const todoForm =document.querySelector(".todo-form");
const todoInput =document.querySelector("#inputTodo");
const todoAddButton =document.querySelector("#addTodoButton");
const todoLists =document.querySelector("#lists");
const messageElement =document.querySelector("#message");

//showMessage
const showMessage = (text,status)=>{
    messageElement.textContent =text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
       messageElement.textContent =""; 
       messageElement.classList.remove(`bg-${status}`);
    },1000)

}



//createTodo
const createTodo =(todoId,todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML=`
        <span>${todoValue}</span>
        <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
    `;
    todoLists.appendChild(todoElement);
}
//addTodo
//function addTodo
    const addTodo =(event)=>{
        event.preventDefault();
        const todoValue = todoInput.value;
       //console.log(todoInput.value);
       //unique id
       const todoId=Date.now().toString();
      // console.log(todoId);
      //createTodo
      createTodo(todoId,todoValue);
      showMessage("Todo is added successfully","success");

      //adding todo to localStorage
      const todos= localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
      todos.push({todoId,todoValue});
      localStorage.setItem("mytodos",JSON.stringify(todos));
      todoInput.value="";
    };
//adding listeners with form;
todoForm.addEventListener("submit",addTodo);
// todoForm.addEventListener("submit",(event)=>{
//     event.preventDefault();
//     console.log(todoInput.value);
// })
