$(document).ready(function() {

    connectWebSocket();
    sendGetRequest();
});

function sendGetRequest() {
    var param1 = "0"; // Ersetzen Sie dies durch den tatsächlichen Wert
    var param2 = "0"; // Ersetzen Sie dies durch den tatsächlichen Wert

    $.post(`/put/${param1}/${param2}`, function(data) {
        console.log(data);
    }).fail(function(error) {
        console.error('Error:', error);
    });

}
 
 function connectWebSocket() {
    var webSocket = new WebSocket("ws://localhost:9000/websocket");
    
    webSocket.onopen = function(event) {
        console.log("Connected to Websocket");

    }

    webSocket.onmessage = function(message) {
        const payload = JSON.parse(message.data);
        console.log("payload: " + payload);
    }

    webSocket.onclose = function() {
        console.log("Connection with Websocket closed!");
    }

    webSocket.onerror = function(error) {
        consolse.log("Errow in Websocket at: " + error);
    }
}