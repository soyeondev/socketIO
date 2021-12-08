const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const room = document.getElementById("room")

room.hidden = true

let roomName;

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("input");
    const value = input.value
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`)
    })
    input.value = ""
}

function showRoom(){
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3")
    h3.innerText = `Room ${roomName}`
    const form = room.querySelector("form")
    form.addEventListener("submit", handleMessageSubmit)
}

function addMessage(msg){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = msg
    ul.appendChild(li)
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit(
        "enter_room", 
        input.value,
        showRoom
    )
    roomName = input.value
    console.log("roomName: ", roomName)
    input.value =""
}

form.addEventListener("submit", handleRoomSubmit)

socket.on("welcome", () => {
    addMessage("someone joined!")
})

socket.on("bye", () => {
    addMessage("someone left ㅠㅠ")
})

socket.on("new_message", (msg) => addMessage(msg))