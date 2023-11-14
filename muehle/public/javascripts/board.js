function handleButtonClick(cellId) {
    var cell = document.getElementById(cellId);
    if (cell) {
        cell.style.backgroundColor = '#FFFFFF';  // Setze die Hintergrundfarbe auf Weiß
    } else {
        console.error('Element mit der ID ' + 'cell-' + cellId + ' nicht gefunden.');
    }
}