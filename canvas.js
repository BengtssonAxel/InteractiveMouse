//Defines the canvas and allow for usage
var canvas = document.querySelector('canvas');

//sets the Canvas to the size of the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Allows for drawing on a 2d plain
var ctx = canvas.getContext('2d');

// Creates a mouse object with x and y coordinates
var mouse = {
	x: undefined,
	y: undefined,
};

// Sets the max and min of the balls
var maxRadius = 40;
var minRadius = 10;

// Array containing the colors of the balls
var colorArray = ['#0D1A26', '#3F6473', '#5E888C', '#DCE4F2', '#BF5A5A'];

// Adds an eventListner to locate the x and y of the mouse pos
window.addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

// Adds an eventListner that listens for a resizing of the window
window.addEventListener('resize', function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	// This runs every time the window is being resized
	init();
});

// This creates an circle (ball) object with parameters for the circles
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	// This fetches an random color from our array
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	// The function that draws out the circles
	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	// This function updates the position of the circles
	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//Interactivity of the circles reacting to the mouse pos
		if (
			mouse.x - this.x < 50 &&
			mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 &&
			mouse.y - this.y > -50
		) {
			if (this.radius < maxRadius) {
				this.radius += 3;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		// Draws the new pos and size of the circle
		this.draw();
	};
}

// Creates an array of circle objects
var circleArray = [];

// Initialises the filling of the circle array and gives the random values
function init() {
	circleArray = [];
	for (var i = 0; i < 600; i++) {
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 4;
		var dy = (Math.random() - 0.5) * 4;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

// Creates an infinite loop that calls the update function and itself. It also clears the canvas with each pass
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 1; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

//Starts the programme
animate();
init();
