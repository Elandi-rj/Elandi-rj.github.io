
var cols = 36;
var rows = 36;
var angle = 0.90;
const strengthMultiplier = -200;
const strengthDampening = 0.99;


let arrBlocks = new Array(rows);
let arrBuffer = new Array(rows);
var mystring = "";
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    for (var i = 0; i < arrBlocks.length; i++) {
        arrBlocks[i] = new Array(2);
        arrBuffer[i] = new Array(2);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            arrBlocks[i][j] = new Block();
            arrBuffer[i][j] = new Block();
        }
    }
    /*
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                arrBlocks[i][j].RainValue = strengthMultiplier;
    
            }
        }
    */
}

function draw() {
    background(51);
    //ambientLight(51, 102, 200);
    //pointLight(250, 60, 70, 200, -200, 400);
    //angle += 0.005;
    rotateX(angle);
    //translate(150, -250, -800);
    translate(250, -600, -200);
    for (var i = 1; i < rows - 1; i++) {
        for (var j = 1; j < cols - 1; j++) {

            arrBuffer[i][j].RainValue =
                ((arrBlocks[i - 1][j].RainValue +
                    arrBlocks[i + 1][j].RainValue +
                    arrBlocks[i][j + 1].RainValue +
                    arrBlocks[i][j - 1].RainValue) / 2 - arrBuffer[i][j].RainValue);

            arrBuffer[i][j].RainValue = arrBuffer[i][j].RainValue * strengthDampening;

            arrBlocks[i][j].drawboy(((i * 40) - width / 2), ((j * 40) - height / 2));
            rectMode(CENTER);
            arrBlocks[i][j].height = arrBlocks[i][j].RainValue;
        }
    }
    var arrTemp = arrBlocks;
    arrBlocks = arrBuffer;
    arrBuffer = arrTemp;


    let x = Math.round(map(mouseX, 0, windowWidth, 1, cols - 6));
    let y = Math.round(map(mouseY, 0, windowHeight, 1, rows - 6));


    if (mouseIsPressed) {
        for (let i = 0; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                arrBlocks[x + i][y + j].RainValue = strengthMultiplier;
            }
        }
    }
}

class Block {
    constructor() {
        this.size = 40;
        this.height;
        this.RainValue = 0;
    }
    drawboy(posx, posy) {
        noStroke();
        push();
        translate(posx, posy, this.height);
        fill(color(this.RainValue + 50, this.RainValue + 50, 150 + this.RainValue));
        box(this.size);
        pop();
    }

    growboy(growthnum) {
        this.size += growthnum;
    }
}

function resetArray() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {

            arrBuffer[i][j].RainValue = 0;
            arrBlocks[i][j].RainValue = 0;
        }
    }
}
function boost() {
    for (var i = 1; i < rows - 1; i++) {
        for (var j = 1; j < cols - 1; j++) {
            arrBuffer[i][j].RainValue = 0;
        }
    }
}