const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');


function displayGreeting(text) {
	greeting.classList.add('showing');
	greeting.innerText = `Hello, ${text}.`;
}


function getInput(event) {
	event.preventDefault();  // form태그에서 input시 창 넘어가는 것을 방지
	const userName = input.value;
	// save the input value to Local Storage
	localStorage.setItem('currentUser', userName);
	input.value = "";
	form.classList.remove('showing');
	displayGreeting(userName);
}


function init() {
	const currentUser = localStorage.getItem('currentUser');
	if (currentUser) {
		//load currentUser from Local Storage
		displayGreeting(currentUser);
	} else {
		// set currentUser to Local Storage
		form.classList.add('showing')
		form.addEventListener('submit', getInput);
	}
}

window.addEventListener('DOMContentLoaded', init);
