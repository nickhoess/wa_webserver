$(document).ready(function() {
    connectWebSocket();
});

function updateField(y,x, yNew, xNew, playStone, action) { 
    var cell = document.getElementById('cell' + y + x);

    switch(action) {
        case 'put':
            var cell = document.getElementById('cell' + y + x)
            if (playStone == 'W') {
                cell.style.backgroundColor = '#FFFFFF';
            } else if (playStone == 'B') {
                cell.style.backgroundColor = '#FF0000';
            }
            break;
        case 'take':
            var cell = document.getElementById('cell' + y + x)
            cell.style.backgroundColor = '#000000';
            break;
        case 'move':
            var cell = document.getElementById('cell' + y + x)
            var cellNew = document.getElementById('cell' + yNew + xNew)
            
            cellNew.style.backgroundColor = cell.style.backgroundColor;
            cell.style.backgroundColor = '#000000';

            break;
        default:
            // Optionaler Code für den Fall, dass move keinen der obigen Werte hat
            break;
    }

}




function connectWebSocket() {
    var webSocket = new WebSocket("ws://localhost:9000/websocket");
    
    webSocket.onopen = function(event) {
        console.log("Connected to Websocket");

    }

    webSocket.onmessage = function(message) {
        const payload = message.data;

        updateFiled(payload.y, payload.x, payload.action);
    }

    webSocket.onclose = function() {
        console.log("Connection with Websocket closed!");
    }

    webSocket.onerror = function(error) {
        consolse.log("Errow in Websocket at: " + error);
    }
//test

}