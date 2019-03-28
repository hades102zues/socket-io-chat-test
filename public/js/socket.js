const socket = io();
const inputEle = document.querySelector('.message-input');
const formEle = document.querySelector('.send-spot');
const chatBox = document.querySelector('.chat-box');


const formSubmitHandler = (e) =>{
	e.preventDefault();
	socket.emit('chat message', inputEle.value);
	inputEle.value = '';
}


formEle.addEventListener('submit', formSubmitHandler);
socket.on('chat message', (msg)=>{
 //create new h tag with value of name
 const h5 = document.createElement('h5');
 h5.className="username";
 const h5Text = document.createTextNode('Name');
 h5.appendChild(h5Text);

 //create a new p tag with value message
 const p = document.createElement('p');
 p.className = 'message-text';

 const pText = document.createTextNode(msg);
 p.appendChild(pText)

 //create a new div with class message box
 const message = document.createElement('div');
 message.className ="message-box";

 //append h followed by p onto div
 message.appendChild(h5);
 message.appendChild(p);


 //append message onto chatbox
 chatBox.appendChild(message);
});