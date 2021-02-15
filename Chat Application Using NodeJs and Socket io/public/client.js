const socket = io();
let names;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

//prompt window
do {
  names = prompt("Please Enter Your Name : ");
} while (!names);

//Getting message from textarea and sending to sendMessage function
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

const sendMessage = (message) => {
  let msg = {
    user: names,
    message: message.trim(),
  };

  //Append
  appendMessage(msg, "outgoing");
  //sent msg should be clear in the textarea
  textarea.value = "";
  //calling scrollToBottom function
  scrollToBottom();

  //send to server and// we can give any name here (SMS)
  socket.emit("message", msg);
};

//creating a Div for incomingMessage and OutgoingMessage
const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  //appending to messageArea
  messageArea.appendChild(mainDiv);
};

//Another client recieving msg
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  //calling scrollToBottom function
  scrollToBottom();
});

//while sending message automatic scroll to bottom
const scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
