function Snake(sw, sh) {
	this.w = sw;
	this.h = sh;
	this.body = [];
	this.body[0] = [floor(cw / this.w / 4), floor(ch / this.h / 2)];
	this.dir = DIR_RIGHT;
	this.nextDir = [];
	
	this.changeDir = function(kyCde) {
		switch (kyCde) {
			case RIGHT_ARROW:
				this.nextDir.push(DIR_RIGHT);
				break;
			case LEFT_ARROW:
				this.nextDir.push(DIR_LEFT);
				break;
			case DOWN_ARROW:
				this.nextDir.push(DIR_DOWN);
				break;
			case UP_ARROW:
				this.nextDir.push(DIR_UP);
				break;
		}
	}

	this.show = function() {
		stroke(255);
		for (var i = 0; i < this.body.length; i++) {
			fill(0,round(255*(1 - i/this.body.length)),0);
			rect(this.body[i][0] * sw, this.body[i][1] * sh, this.w, this.h);
		}
	}

	this.contains = function(x, y) {
		for (var i = 0; i < this.body.length; i++) {
			if (this.body[i][0] == x && this.body[i][1] == y) {
				return true;
			}
		}
		return false;
	}

	this.move = function() {
		// Set actual direction to new direction if possible
		auxDir = this.dir+2;
		while (abs(this.dir - auxDir)==2 && this.nextDir.length>0) {
			auxDir = this.nextDir.shift();
		}
		if (abs(this.dir - auxDir) != 2) {
			this.dir = auxDir;
		}
		
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i][0] = this.body[i - 1][0];
			this.body[i][1] = this.body[i - 1][1];
		}
		this.body[0][0] = this.body[0][0] + (this.dir + 1) % 2 * (1 - this.dir);
		this.body[0][1] = this.body[0][1] + this.dir % 2 * (2 - this.dir);
	}
	
	this.check = function(fd) {
		if (this.body[0][0] < 0 || this.body[0][0]*this.w>=cw || this.body[0][1]<0 || this.body[0][1]*this.h>=ch) {
			return STATUS_DEAD;
		}
		if (this.body[0][0]==fd[0] && this.body[0][1]==fd[1]) {
			return STATUS_EATING;
		}
		for (var i=1; i<this.body.length; i++) {
			if (this.body[0][0]==this.body[i][0] && this.body[0][1]==this.body[i][1]) {
				return STATUS_DEAD;
			}
		}
		return STATUS_ALIVE;
	}
	
	this.grow = function() {
		var len = this.body.length;
		var px = this.body[len-1][0];
		var py = this.body[len-1][1];
		var x, y;

		if (len > 1) {
			var ppx = this.body[len-2][0];
			var ppy = this.body[len-2][1];
			x = 2*px - ppx;
			y = 2*py - ppy;
		} else {
			x = px - (this.dir + 1) % 2 * (1 - this.dir);
			y = py - this.dir % 2 * (2 - this.dir);
		}
		this.body.push([x,y]);
	}
}