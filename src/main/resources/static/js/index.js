//INSTANCE OF WEBSOCKET
const socket = new WebSocket("wss://livechat-hkgu.onrender.com/connect");
const client = Stomp.over(socket);

//PRÉ-SET TO FORMS

function submitForm(e){
    e.preventDefault();
}

function openChat(){
    setUserName();
    const div_login = document.querySelector(".login");
    div_login.style.display = "none";
    document.getElementById("chat").style.display = "flex";
}

//SET USERNAME 
function setUserName(){
    const userName = document.getElementById("userName").value;
    localStorage.setItem("user", userName);
}

//SEND MESSAGE
function sendMessage(){
    const message = {
        user: localStorage.getItem("user"),
        message: document.getElementById("message").value
    }

    client.send("/app/chatmessages", {}, JSON.stringify(message));
    document.getElementById("message").value = "";
}

//FUNCTION TO INCLUDE THE PARAGRAPH TO MESSAGES DIV
function appendUserAndMessage(user, message){
    const p = document.createElement("p");
    p.textContent = user + ": " + message;
    p.setAttribute("id", "div-message-typped");
    document.querySelector(".messages").appendChild(p);
    p.scrollIntoView({ behavior: "smooth", block: "end" });
}

//CONNECT WITH WEBSOCKET
function connect(){
    client.connect({}, (frame)=>{

        client.subscribe("/chat", (message)=>{
            const chatMessage = JSON.parse(message.body);
            appendUserAndMessage(chatMessage.user, chatMessage.message);
        })
    })
}

connect();