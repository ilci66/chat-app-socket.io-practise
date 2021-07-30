const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//username and room infos are present here, very useful stuff
// console.log(Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// }))

const { username, room } = Qs.parse(location.search, {
  //keep it true to select only the queries
  ignoreQueryPrefix: true,
})

const socket = io();

// console.log(socket)

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  console.log("room users")
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log("this is the message >>>", message);
  outputMessage(message);

  // You make the latest messages visible by keeping it
  // scrolling to the bottom, scrollHeight gets the length
  // with paddings, srollTop, well scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  console.log("submit messages target >>", e.target)
  let msg = e.target.elements.msg.value;
  
  console.log(msg)

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  //they will probably write again
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  console.log('adding message to dom >>', message)
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
};

function outputRoomName(room) {
  roomName.innerText = room;
}


// Add room name to DOM
function outputRoomName(room) {
  console.log('add roo name to DOM >>', room)
  roomName.innerText = room;
};

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
};

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  console.log(leaveRoom)
  if (leaveRoom) {
    console.log('wanna leave chat')
    window.location = './index.html';
  } else {
    console.log('well nothing yet')
  }
});