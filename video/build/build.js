var Axes = (function () {
    function Axes() {
    }
    Axes.draw = function (middleX, middleY, translateToMiddle, footer, axisColor, textSize, tickSize, tickStep, textShift) {
        if (translateToMiddle === void 0) { translateToMiddle = true; }
        if (footer === void 0) { footer = 'by Inspiro Club'; }
        if (axisColor === void 0) { axisColor = 'lightgrey'; }
        if (textSize === void 0) { textSize = 20; }
        if (tickSize === void 0) { tickSize = 10; }
        if (tickStep === void 0) { tickStep = 50; }
        if (textShift === void 0) { textShift = 1.6; }
        push();
        noStroke();
        textFont('System', textSize);
        stroke(axisColor);
        fill(axisColor);
        strokeWeight(1);
        line(middleX, 0, middleX, height);
        line(0, middleY, width, middleY);
        translate(middleX, middleY);
        for (var x = tickStep; x < width - middleX; x += tickStep) {
            textAlign(CENTER, TOP);
            line(x, -tickSize, x, +tickSize);
            text(x, x, tickSize * textShift);
            textAlign(CENTER, BOTTOM);
            line(-x, -tickSize, -x, tickSize);
            text(-x, -x, -tickSize * textShift);
            push();
            for (var y = tickStep; y < height - middleY; y += tickStep) {
                strokeWeight(2);
                point(x, y);
                point(-x, y);
                point(x, -y);
                point(-x, -y);
            }
            pop();
        }
        for (var y = tickStep; y < height - middleY; y += tickStep) {
            textAlign(LEFT, CENTER);
            line(-tickSize, -y, +tickSize, -y);
            text(y, tickSize * textShift, y + textSize);
            textAlign(RIGHT, CENTER);
            line(-tickSize, y, tickSize, y);
            text(-y, -tickSize * textShift, -y);
        }
        textAlign(CENTER, TOP);
        if (middleX) {
            text('X', width - middleX - tickSize * textShift - textSize / 2, -tickSize * textShift * textShift - textSize / 2);
        }
        textAlign(CENTER, TOP);
        if (middleY) {
            text('Y', +tickSize * textShift + textSize / 2, -middleY + textSize / 2);
        }
        textAlign(CENTER, BOTTOM);
        noStroke();
        text(footer, width - middleX - textWidth(footer), height - middleY - textSize);
        pop();
        if (translateToMiddle) {
            translate(middleX, middleY);
        }
    };
    return Axes;
}());
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var sound;
var qr;
var tracker;
var capture;
var downSize = 10;
var zoom = 20;
var captureWidth = 640 / downSize;
var captureHeight = 480 / downSize;
function preload() {
}
function setup() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            createCanvas(windowWidth, windowHeight);
            capture = createCapture(VIDEO);
            capture.size(captureWidth, captureHeight);
            capture.hide();
            background("background");
            angleMode(DEGREES);
            return [2];
        });
    });
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    clear();
    push();
    translate((width / 2) - (captureWidth * zoom) / 2, ((height / 2) - (captureHeight * zoom) / 2));
    capture.loadPixels();
    for (var i = 0; i < capture.pixels.length; i = i + 4) {
        var colorRed = capture.pixels[i];
        var colorGreen = capture.pixels[i + 1];
        var colorBlue = capture.pixels[i + 2];
        var alpha_1 = capture.pixels[i + 3];
        var y = Math.floor((i / 4) / captureWidth) * zoom;
        var x = (i / 4) % captureWidth * zoom;
        var rotation = map(colorRed, 0, 255, 0, 360);
        push();
        stroke(colorRed, colorGreen, colorBlue);
        strokeWeight(10);
        translate(x, y);
        rotate(rotation);
        line(-zoom / 2, -zoom / 2, zoom / 2, zoom / 2);
        pop();
    }
    pop();
}
//# sourceMappingURL=build.js.map