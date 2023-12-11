$(document).ready(function() {
    connectWebSocket();
});

function updateField(y,x, yNew, xNew, playStone, action) { 
    console.log('updateField: ' + y + x + yNew + xNew + playStone + action);

    var cellID = 'button-' + y + '-' + x;
    console.log(cellID)

    var cell = document.getElementById(cellID)


    switch(action) {
        case 'put':
            if (playStone == 'W') {
                cell.style.backgroundColor = '#FFFFFF';
            } else if (playStone == 'B') {
                cell.style.backgroundColor = '#FF0000';
            }
            break;
        case 'take':
            cell.style.backgroundColor = '#000000';
            break;
        case 'move':
            var cell = document.getElementById('button-'+ y + '-' + x)
            var cellNew = document.getElementById('button-' + yNew + '-' + xNew)
            var cellColorOld = cell.style.backgroundColor;
            cell.style.backgroundColor = '#000000';
            cellNew.style.backgroundColor = cellColorOld;

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
        const payload = JSON.parse(message.data);
        updateField(payload.param1G, payload.param2G, payload.param3G, payload.param4G, payload.playerstatusG, payload.gamestatusG);
        console.log("payload: " + payload);
    }

    webSocket.onclose = function() {
        console.log("Connection with Websocket closed!");
    }

    webSocket.onerror = function(error) {
        consolse.log("Errow in Websocket at: " + error);
    }
}