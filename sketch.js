cw = 900;
ch = 600;
ratio = 30;

var snake;
var food;
var state;
var score;
var buttons = [];

function setup() {
	sw = floor(cw / ratio);
	// sh = floor(ch / ratio);
  sh = sw;
	createCanvas(cw, ch + 50);
	background(220);
	for (i = 0; i < cw; i += sw) {
		for (j = 0; j < ch; j += sh) {
			noFill();
			stroke(210);
			rect(i, j, sw, sh);
		}
	}
	fill(255);
	stroke(0);
	rect(0, ch, cw-1, 49);
  fill(230);
  rect(cw/3, 5*ch/12, cw/3, ch/6);
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  text("Use the arrow keys to move\n\nEat apples to grow", cw/2, ch/2);
	// button = createButton("New Game");
	// button.position(cw / 2 - button.width / 2, ch + 25 - button.height / 2);
	// button.mousePressed(initialize);
  button = new MyButton();
  buttons.push(button);
  button.setText("New Game");
  button.setTextSize(16);
  button.setBackground(215);
  button.setSize(100, 30);
  button.setPosition(cw/2 - button.width/2, ch + 25 - button.height/2);
  button.show();
  button.setOnClick("initialize");
}

function draw() {
	if (state == STATUS_ALIVE || state == STATUS_EATING) {
		tick();
	} else {
		noLoop();
	}
}

function initialize() {
	fps = 4;
	frameRate(fps);
	score = 0;
	snake = new Snake(sw, sh);
	for (var i = 0; i < 2; i++) {
		snake.grow();
	}
	state = STATUS_ALIVE;
	food = newFood();
	tick();
	loop();
}

function tick() {
	snake.move();
	state = snake.check(food);
	if (state != STATUS_DEAD) {
		background(220);
		for (i = 0; i < cw; i += sw) {
			for (j = 0; j < ch; j += sh) {
				noFill();
				stroke(210);
				rect(i, j, sw, sh);
			}
		}
		if (state == STATUS_EATING) {
			score++;
			if (score % 3 == 0) {
				fps = min(fps + 1, 20);
				frameRate(fps);
			}
			snake.grow();
			food = newFood();
		}
		showFood();
		snake.show();
		fill(255);
		stroke(0);
		rect(0, ch, cw, 50);
		fill(0);
		noStroke();
		textSize(18);
    textAlign(LEFT, CENTER);
		text("Score: " + score + "\nLevel: " + (floor(score / 3) + 1), 10, ch+25);
    button.show();
	} else {
    fill(230);
    stroke(0);
    rect(5*cw/12, 5*ch/12, cw/6, ch/6);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text("You lost!\nTry again?", cw/2, ch/2);
  }
}

function keyPressed() {
	snake.changeDir(keyCode);
}

function mousePressed() {
	for (var i=0; i<buttons.length; i++) {
  	if (buttons[i].contains(mouseX, mouseY)) {
      print(buttons[i].onClick());
    	window[buttons[i].onClick()]();
    }
  }
}

function newFood() {
	var x;
	var y;
	while (true) {
		x = floor(random(floor(cw / sw)));
		y = floor(random(floor(ch / sh)));
		if (!snake.contains(x, y)) {
			return [x, y];
		}
	}
}

function showFood() {
	fill(255, 0, 0);
	stroke(0);
	rect(food[0] * sw, food[1] * sh, sw, sh);
}