'use strict';

class Shape {
    constructor(name, color) {
        this._name = name;
        this._colour = color;
    }

    get name() {
        return this._name;
    }
    get colour() {
        return this._colour;
    }
    getInfo() {
        return `${this._colour} ${this._name}`;
    }
}

let shapesArray = new Array(24).fill(null); // Pre-fill the array to hold 24 shapes

function createShape() {
    // Find the next null slot in the shapesArray
    const nextIndex = shapesArray.indexOf(null);
    if (nextIndex === -1) {
        document.getElementById('shapeInfo').textContent = 'Storage is full.';
        return;
    }

    let shapeType = document.getElementById('shapeType').value;
    let colorName = document.getElementById('color').value;
    let colorClass = colorName.toLowerCase();

    if (shapeType === "" || colorName === "") {
        // Do nothing if no shape or color is selected
        return;
    }

    let newShape = new Shape(shapeType, colorName);
    shapesArray[nextIndex] = newShape; // Store the new shape in the array

    let shapeDiv = document.createElement('div');
    shapeDiv.className = `shape ${shapeType} ${colorClass}`;

    let shapeIndex = shapesArray.findIndex(s => s === null); // Find the index for the new shape

    shapeDiv.onclick = function() {
        if (shapeIndex  === -1) {
            document.getElementById('shapeInfo').textContent = `Unit 24: ` + newShape.getInfo();
        } else {
            document.getElementById('shapeInfo').textContent = `Unit ${shapeIndex}: ` + newShape.getInfo();
        }
    };
   
    // Calculate the grid position based on the nextIndex
    let gridRow = Math.floor(nextIndex / 6);
    let gridColumn = nextIndex % 6;
    shapeDiv.style.gridColumnStart = gridColumn + 1;
    shapeDiv.style.gridRowStart = 4 - gridRow; // Reverse the row order
    document.getElementById('shapeContainer').appendChild(shapeDiv);
}

