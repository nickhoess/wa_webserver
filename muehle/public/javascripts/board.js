var playerstatus = 'W';
var gamestatus = 'put';
var clickCounter = 0;
var number1 = null;
var number2 = null;
var number1new = null;
var number2new = null;
var cellIDold = null;
var cellIDnew = null;


$(document).ready(function() {

    connectWebSocket();
    // Reagiere auf Klicks auf alle Elemente mit der Klasse 'cell'
    $('.cell').click(function() {
        var cellId = $(this).attr('id'); // Hole die ID des geklickten Elements
        handleButtonClick(cellId);
    });
});


function handleButtonClick(cellId) {

    var cell = $('#' + cellId);
    console.log(cell);
    var parts = cellId.split('-'); // Split the cellId by hyphens

    if (parts.length < 3) {
        console.error('Invalid cellId format: ' + cellId);
        return;
    }

    console.log('Clicked on cell ' + number1 + '-' + number2);

    if(gamestatus == 'put') {

        var pnumber1 = parseInt(parts[parts.length - 2]);
        console.log('pn1: ' + pnumber1);
        var pnumber2 = parseInt(parts[parts.length - 1]);
        console.log('pn1: ' + pnumber2);


        $.ajax({
            type: "POST",
            url: "/put",
            contentType: "application/json",
            data: JSON.stringify({ param1: pnumber1, param2: pnumber2}),
            success: function(data) {
                console.log('Playerstatus: ' + playerstatus);
            gamestatus = data.value2;

            if (playerstatus == 'W') {
                cell.css('background-color', '#FFFFFF'); // .style.backgroundColor = '#FFFFFF'
            } else if(playerstatus == 'B') {
                cell.css('background-color', '#FF0000');
            }

            playerstatus = data.value1;
            },
            error: function(xhr, status, error) {
                console.log('Error: ', error);
            }
    
        })

    } else if (gamestatus == 'take') {

        var pnumber1 = parseInt(parts[parts.length - 2]);
        var pnumber2 = parseInt(parts[parts.length - 1]);
            

        $.ajax({
            type: "POST",
            url: "/take",
            contentType: "application/json",
            data: JSON.stringify({ param1: pnumber1, param2: pnumber2}),
            success: function(data) {

                playerstatus = data.value1;
                console.log('Playerstatus: ' + playerstatus);
                gamestatus = data.value2;

                cell.css('background-color', '#000000');

                playerstatus = data.value1;
            },
            error: function(xhr, status, error) {
                console.log('Error: ', error);
            }
    
        })
    
    } else if (gamestatus == 'move') {
        clickCounter++;

        if (clickCounter === 1) {
            number1 = parseInt(parts[parts.length - 2]);
            number2 = parseInt(parts[parts.length - 1]);
            cellIDold = cellId;
            console.log('Erste CellID: ' + number1 + '-' + number2);
          return;
        } else if (clickCounter === 2) {
            number1new = parseInt(parts[parts.length - 2]);
            number2new = parseInt(parts[parts.length - 1]);
            cellIDnew = cellId;

            
            $.ajax({
                type: "POST",
                url: "/move",
                contentType: "application/json",
                data: JSON.stringify({ param1: number1, param2: number2, param3: number1new, param4: number2new}),
                success: function(data) {
    
                    console.log('Playerstatus: ' + playerstatus);
                    gamestatus = data.value2;

                    if (playerstatus == 'W') {
                        cellIDold.css('background-color' , '#000000');
                        cellIDnew.css('background-color' , '#FFFFFF');
                        //document.getElementById(cellIDold).style.backgroundColor = '#000000'
                    } else if(playerstatus == 'B') {
                        cellIDold.css('background-color' , '#000000');
                        cellIDnew.css('background-color' , '#FF0000');
                        }
                    
                        playerstatus = data.value1;
                },
                
                error: function(xhr, status, error) {
                    console.log('Error: ', error);
                }
        
            })

          clickCounter = 0;
          number1 = null;
          number2 = null;
          number1new = null;
          number2new = null;
          cellIDnew = null;
          cellIDold = null;
        }
    }
}


function connectWebSocket() {
    var webSocket = new WebSocket("ws://localhost:9000/websocket");
    
    webSocket.onopen = function(event) {
        console.log("Connected to Websocket");

    }

    webSocket.onmessage = function(message) {
        const payload = message.data;
    }

    webSocket.onclose = function() {
        console.log("Connection with Websocket closed!");
    }

    webSocket.onerror = function(error) {
        consolse.log("Errow in Websocket at: " + error);
    }


}