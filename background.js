const body = document.querySelector('body');

const IMG_NUMBER = 14;


function displayImage(imgNumber) {
	const image = new Image(); // document.createElement('img');
	image.src = `./img/${imgNumber}.jpg`;
	image.classList.add("backgroundImg");
	body.prepend(image); 
}

function genRandom() {
	const number = Math.floor(Math.random() * IMG_NUMBER + 1); // 1 ~ 14
	console.log(number);
	return  number;
}

function init() {
	const randomNumber = genRandom();
	console.log(randomNumber);
	displayImage(randomNumber);
}

window.addEventListener('DOMContentLoaded', init);
