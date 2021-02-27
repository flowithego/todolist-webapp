const todoForm = document.querySelector('.js-todoForm');
const todoInput = document.querySelector('.todoInput');
const todoUL = document.querySelector('.js-todoList');

// LOAD TODOS -> if true -> addTodo(todo)
const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
	todos.forEach((todo) => addTodo(todo));
}

function updateLS() {
	const todosLI = Array.from(document.querySelectorAll('li'));
	let TODOS = [];

	todosLI.forEach((todo) => {
		TODOS.push({
			text: todo.innerText,
		});
	});

	localStorage.setItem('todos', JSON.stringify(TODOS));
}

function addTodo(todo) {
	let todoText = todoInput.value; // new input
	if (todo) {
		// existing todo loaded from LS
		todoText = todo.text;
	}

	if (todoText) {
		const todoLI = document.createElement('li');
		const delBtn = document.createElement('button');
		const text = document.createElement('span');
		// button 태그 내에 icon 삽입
		delBtn.innerHTML = '<i class="fas fa-times fa-lg"></i>';

		// DELETE: event
		delBtn.addEventListener('click', () => {
			todoLI.remove();
			updateLS();
		});

		text.innerText = todoText;

		todoLI.appendChild(delBtn);
		todoLI.appendChild(text);

		todoUL.appendChild(todoLI);
		todoInput.value = '';

		updateLS();
	}
}

function init() {
	todoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		addTodo();
	});
}

window.addEventListener('DOMContentLoaded', init);
