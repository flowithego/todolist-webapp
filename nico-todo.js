const todoForm = document.querySelector('.js-todoForm'),
	todoInput = todoForm.querySelector('input'),
	todoList = document.querySelector('.js-todoList');

// The purpose is to save a string on a variable so I don't
// have to write the string and maybe make a mistake.
const TODOS_LOCAL_STORAGE = 'TODOS';
let TODOS = [];
let newId = 0;


function deleteTodo(event) {
	const button = event.target;
	const li = button.parentNode;
	todoList.removeChild(li);
	//목록에서는 지웠지만 새로고침을 하면 다시 나타난다
	//따라서 배열목록에서도 지워주어야 한다.
	const cleanTodos = TODOS.filter(function (todo) {
		return todo.id !== parseInt(li.id); // 또는 JSON.parse(li.id)
	});

	TODOS = cleanTodos;
	saveTodos();
}

function saveTodos() {
	localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(TODOS));
}

function paintTodo(text) {
	const li = document.createElement('li');
	const delButton = document.createElement('button');
	const span = document.createElement('span');

	delButton.innerHTML = '❌';
	delButton.addEventListener('click', deleteTodo);
	span.innerText = text;

	li.appendChild(delButton);
	li.appendChild(span);
	li.id = newId;
	todoList.appendChild(li);
	// todoList.style.color = '#fff';
	const todoObj = {
		text: text,
		id: newId,
	};
	TODOS.push(todoObj);
	saveTodos();
	newId++;
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = todoInput.value;
	paintTodo(currentValue);
	// TODO 입력 후 입력한 내용을 input창에서 지우기
	todoInput.value = '';
}

function loadTodos() {
	// array of objects
	const loadedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE);
	if (loadedTodos !== null) {
		const parsedTodos = JSON.parse(loadedTodos);
		parsedTodos.forEach(function (todo) {
			paintTodo(todo.text);
		});
	}
}

function init() {
	loadTodos();
	// const todos = localStorage.getItem(TODOS_LOCAL_STORAGE)

	// 입력은 input창에서 하지만 submit은 form 태그내에서 일어나므로
	// 이벤트 리스너는 form 태그의 할당 변수로 지정해주어야 한다.
	todoForm.addEventListener('submit', handleSubmit);
}

init();
