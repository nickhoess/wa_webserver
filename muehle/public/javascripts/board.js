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
    .then(data => console.log(data))
    .catch((error) => {
        console.log('Error:', error);
    });

}