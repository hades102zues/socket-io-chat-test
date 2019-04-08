const socket = io();
const username = "User" + Math.random().toString();

const inputEle = document.querySelector(".message-input");
const formEle = document.querySelector(".send-spot");
const chatBox = document.querySelector(".chat-box");

const formSubmitHandler = e => {
	e.preventDefault();
	socket.emit("chat message", { msg: inputEle.value, username: username });
	inputEle.value = "";
};

const scrollToBottom = () => {
	/**
		clientHeight is the amount of the container the user sees
	**/
	/**
		scrollTop is the height at which the scroll position is
	**/

	/**
		scrollHeight the total height of the box INCLUSION of scroll
	**/
	chatBox.scrollTop = chatBox.scrollHeight;
};

formEle.addEventListener("submit", formSubmitHandler);

socket.on("chat message", msg => {
	const lease = 50;
	let shouldScroll =
		chatBox.scrollTop >=
		chatBox.scrollHeight - chatBox.clientHeight - lease;
	//create new h tag with value of name
	const h5 = document.createElement("h5");
	h5.className = "username";
	const h5Text = document.createTextNode(msg.username);
	h5.appendChild(h5Text);

	if (msg.username !== username) h5.style.color = "purple";

	//create a new p tag with value message
	const p = document.createElement("p");
	p.className = "message-text";

	const pText = document.createTextNode(msg.msg);
	p.appendChild(pText);

	//create a new div with class message box
	const message = document.createElement("div");
	message.className = "message-box";

	//append h followed by p onto div
	message.appendChild(h5);
	message.appendChild(p);

	//append message onto chatbox
	chatBox.appendChild(message);

	if (shouldScroll) scrollToBottom();
	console.log(h5);
});

// const chatBoxScrollHandler = () => {
// 	if (chatBox.scrollTop !== chatBox.scrollHeight) shouldScroll = false;
// 	else shouldScroll = true;
// };

// chatBox.addEventListener("scroll", chatBoxScrollHandler);
