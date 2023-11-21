var playerstatus = 'W';
var gamestatus = 'put';
var clickCounter = 0;
var number1 = null;
var number2 = null;
var number1new = null;
var number2new = null;
var cellIDold = null;
var cellIDnew = null;

function handleButtonClick(cellId) {

    var cell = document.getElementById(cellId);
    var parts = cellId.split('-'); // Split the cellId by hyphens

    if (parts.length < 3) {
        console.error('Invalid cellId format: ' + cellId);
        return;
    }

    console.log('Clicked on cell ' + number1 + '-' + number2);

    if(gamestatus == 'put') {

        var pnumber1 = parseInt(parts[parts.length - 2]);
        var pnumber2 = parseInt(parts[parts.length - 1]);

        fetch('/put', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ param1: pnumber1, param2: pnumber2 })
        })
        .then(response => response.json())
        .then(data => {

            
            console.log('Playerstatus: ' + playerstatus);
            gamestatus = data.value2;

            if (playerstatus == 'W') {
                cell.style.backgroundColor = '#FFFFFF'
            } else if(playerstatus == 'B') {
                cell.style.backgroundColor = '#FF0000'
            }

            playerstatus = data.value1;

        })
        .catch((error) => {
            console.log('Error:', error);
            return;
        });

    } else if (gamestatus == 'take') {

        var pnumber1 = parseInt(parts[parts.length - 2]);
        var pnumber2 = parseInt(parts[parts.length - 1]);
            
            fetch('/take', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ param1: pnumber1, param2: pnumber2 })
            })
            .then(response => response.json())
            .then(data => {

                playerstatus = data.value1;
                console.log('Playerstatus: ' + playerstatus);
                gamestatus = data.value2;

                cell.style.backgroundColor = '#000000'
            })
            .catch((error) => {
                console.log('Error:', error);

            });
    
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
          fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ param1: number1, param2: number2, param3: number1new, param4: number2new})
        })
        .then(response => response.json())
        .then(data => {

            console.log('Playerstatus: ' + playerstatus);
            gamestatus = data.value2;

            if (playerstatus == 'W') {
                document.getElementById(cellIDold).style.backgroundColor = '#000000'
                document.getElementById(cellIDnew).style.backgroundColor = '#FFFFFF'
            } else if(playerstatus == 'B') {
                document.getElementById(cellIDold).style.backgroundColor = '#000000'
                document.getElementById(cellIDnew).style.backgroundColor = '#FF0000'
            }
            playerstatus = data.value1;

        })
        .catch((error) => {
            console.log('Error:', error);

        });

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