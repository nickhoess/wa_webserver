var playerstatus;
var gamestatus;

function handleButtonClick(cellId) {
    var cell = document.getElementById(cellId);

    var parts = cellId.split('-'); // Split the cellId by hyphens

    if (parts.length < 3) {
        console.error('Invalid cellId format: ' + cellId);
        return;
    }

    var number1 = parseInt(parts[parts.length - 2]);
    var number2 = parseInt(parts[parts.length - 1]);
    console.log('Clicked on cell ' + number1 + '-' + number2); 

    fetch('/put', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ param1: number1, param2: number2 })
    })
    .then(response => response.json())
    .then(data => {
        playerstatus = data.value1;
        console.log('Playerstatus: ' + playerstatus);
        gamestatus = data.value2;
    })
    .catch((error) => {
        console.log('Error:', error);
    });

    if (playerstatus == 'B') {
        cell.style.backgroundColor = '#FFFFFF'
    } else {
        cell.style.backgroundColor = '#FF0000'
    }

}