const socket = io();

socket.emit("churan")
socket.on("churan papdi", function(){
    console.log("Churan papdi received")
})