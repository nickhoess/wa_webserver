let clickCount = 0;
let firstClickCellID = null;
let secondClickCellID = null;

function handleClick(cellID) {
  clickCount++;

  if (clickCount === 1) {
    firstClickCellID = cellID;
  } else if (clickCount === 2) {
    secondClickCellID = cellID;
    
    console.log('Erste CellID: ' + firstClickCellID);
    console.log('Zweite CellID: ' + secondClickCellID);
    
    // Zurücksetzen der Variablen für den nächsten Zyklus
    clickCount = 0;
    firstClickCellID = null;
    secondClickCellID = null;
  }
}
