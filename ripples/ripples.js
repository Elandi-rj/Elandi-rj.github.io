let cols = 100; //rows
const sclfactor = 30;
const scl = sclfactor / (cols / (cols / 2));
const center = sclfactor * (cols - 1) / 4;
let arrBlocks = new Array(cols);
let arrBuffer = new Array(cols);
for (let i = 0; i < arrBlocks.length; i++) {
    arrBlocks[i] = new Array();
    arrBuffer[i] = new Array();
    for (let j = 0; j < cols; j++) {
        arrBlocks[i][j] = 0;
        arrBuffer[i][j] = 0;
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight - 54, WEBGL);
    output.innerHTML = 100 - slider.value + "%";
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 54);
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var strengthDampening = slider.value / 100;
//Dampening slider
slider.oninput = function () {
    output.innerHTML = 100 - this.value + "%";
    strengthDampening = slider.value / 100;
}

var sliderStrength = document.getElementById("myStrengthRange");
var outputstrength = document.getElementById("demoStrength");
outputstrength.innerHTML = sliderStrength.value;
var strengthMultiplier = sliderStrength.value - 0;;
//strength slider
sliderStrength.oninput = function () {
    outputstrength.innerHTML = this.value;
    strengthMultiplier = sliderStrength.value - 0;
}

function draw() {
    background(51);
    rotateX(PI / 3);
    translate(-center, -800 - 400, -200);
    frameRate(60);
    noStroke();
    for (var i = 1; i < cols - 1; i++) {
        beginShape(TRIANGLE_STRIP);
        for (var j = 1; j < cols - 1; j++) {
            fill(color(arrBlocks[j][i] + 50, arrBlocks[j][i] + 50, 150 + arrBlocks[j][i]));
            arrBuffer[i][j] =
                ((arrBlocks[i - 1][j] +
                    arrBlocks[i + 1][j] +
                    arrBlocks[i][j + 1] +
                    arrBlocks[i][j - 1]) / 2 - arrBuffer[i][j]);
            arrBuffer[i][j] = arrBuffer[i][j] * strengthDampening;
            vertex(j * scl, i * scl, arrBlocks[j][i]);
            vertex(j * scl, (i + 1) * scl, arrBlocks[j][i + 1]);
        }
        endShape();
    }
    var arrTemp = arrBlocks;
    arrBlocks = arrBuffer;
    arrBuffer = arrTemp;

    let x = Math.round(map(mouseX, 0, windowWidth, 1, cols - 6));
    let y = Math.round(map(mouseY, 0, windowHeight - 50, 1, cols - 6));

    if (mouseIsPressed && mouseX < windowWidth && mouseY >= 0 && mouseX >= 0) {
        for (let i = 0; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                arrBlocks[x + i][y + j] = strengthMultiplier;
            }
        }
    }
}
function resetArray() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < cols; j++) {

            arrBuffer[i][j] = 0;
            arrBlocks[i][j] = 0;
        }
    }
}
function boost() {
    for (var i = 1; i < cols - 1; i++) {
        for (var j = 1; j < cols - 1; j++) {
            arrBuffer[i][j] = 0;
        }
    }
}