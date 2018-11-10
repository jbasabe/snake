function MyButton() {
  
  this.background = color(0);
  this.stroke = 0;
  this.text = "";
  this.textColor = color(0);
  this.textSize = 12;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.clicked = "";
	
  this.setText = function(text) {
    this.text = text;
  }
  
  this.setTextColor = function(r, g, b) {
  	this.textColor = color(r, g, b);
  }
  
  this.setTextColor = function(c) {
  	this.textColor = color(c);
  }
  
  this.setTextSize = function(s) {
  	this.textSize = s;
  }
  
  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  }
  
  this.setSize = function(w, h) {
    this.width = w;
    this.height = h;
  }
  
  this.setBackground = function(r, g, b) {
    this.background = color(r, g, b)
  }
  
  this.setBackground = function(c) {
    this.background = color(c);
  }
  
  this.setStroke = function(s) {
    this.stroke = s;
  }
  
  this.show = function() {
    stroke(this.stroke);
    fill(this.background);
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER, CENTER);
    fill(this.textColor);
    noStroke();
    textSize(this.textSize);
    text(this.text, this.x + this.width/2, this.y + this.height/2);
  }
  
  this.contains = function(x, y) {
  	return x>=this.x && x<=this.x+this.width && y>=this.y && y<=this.y+this.height;
  }
  
  this.onClick = function() {
    return this.clicked;
  }
  
  this.setOnClick = function(f) {
   this.clicked = f; 
  }
}