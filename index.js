//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck)

//Functions
  
	

function addTodo(event){
	//Prevent refreshing of the page
	event.preventDefault();
	if (todoInput.value !== "" ) {
		//todoDiv
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todoInput.value;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		//Add todo to localstorage
		const todo = {
			checked: false,
			text: todoInput.value
		}
		todo.date = "today"
		saveLocalTodos(todo);
		//Check button
		const checkedButton = document.createElement('button');		
		checkedButton.innerHTML = '<i class="fas fa-check-square"></i>';
		checkedButton.classList.add("checked-button");
		todoDiv.appendChild(checkedButton);
		//Delete button
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-times-square"></i>';
		deleteButton.classList.add("delete-button");
		todoDiv.appendChild(deleteButton);
		//Append to list
		todoList.appendChild(todoDiv);
		//Empty input after use
		todoInput.value = "";
	}	
} 

function deleteAndCheck(event){
	const item = event.target;
	//Delete todo
	if (item.classList[0] === "delete-button") {
		const todo = item.parentElement;
		//Remove local todos
		const todoIndex = [...todo.parentElement.children].indexOf(todo);
		let todos = JSON.parse(localStorage.getItem("todos"));
		todos.splice(todoIndex, 1);
		localStorage.setItem("todos", JSON.stringify(todos));
		todo.remove();
	}
	//Check todo
	if (item.classList[0] === "checked-button") {
		const todo = item.parentElement;
		const todoIndex = [...todo.parentElement.children].indexOf(todo);
		let todos = JSON.parse(localStorage.getItem("todos"));
		todos[todoIndex].checked = !todos[todoIndex].checked; 
		localStorage.setItem("todos", JSON.stringify(todos));
		todo.classList.toggle("checked");
		
	}
	
}


function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
	let todos;
	if(localStorage.getItem("todos") === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo) {
		//todoDiv
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo.text;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);		
		//Check button
		const checkedButton = document.createElement('button');		
		checkedButton.innerHTML = '<i class="fas fa-check-square"></i>';
		checkedButton.classList.add("checked-button");
		todoDiv.appendChild(checkedButton);
		//Delete button
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fas fa-times-square"></i>';
		deleteButton.classList.add("delete-button");
		todoDiv.appendChild(deleteButton);
		//Append to list
		if (todo.checked) todoDiv.classList.toggle("checked");
		todoList.appendChild(todoDiv);	
	})
}

//Remove local todos

function removeLocalTodos(todo) {
	const todoIndex = [...todo.parentElement.children].indexOf(todo);
	let todos = JSON.parse(localStorage.getItem("todos"));
	todos.splice(todoIndex, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}