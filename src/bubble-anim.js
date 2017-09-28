// bloganim.js

(function() {

	var color = 'rgba(255, 170, 1, 0.1)';
	var minSize = 30;
	var maxSize = 100;
	var minSpeed = 0.02;
	var maxSpeed = 0.05;
	var circleNum = 15;

	var canvas = null;
	var context = null;
	var circles = [];

	window.addEventListener('load', function(event) {
		createCanvas();
		createCircles();
		initOnResize();
		startTimer();
	});

	var createCanvas = function() {
		canvas = document.createElement('canvas');
		canvas.id = '__background_animation_canvas__';
		canvas.style.position = 'fixed';
		canvas.style.top = 0;
		canvas.style.left = 0;
		canvas.style.zIndex = -1;
		canvas.style.margin = '0';
		canvas.style.padding = '0';

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		context = canvas.getContext('2d');

		document.body.appendChild(canvas);
	};

	var createCircles = function() {
		var w = window.innerWidth;
		if (w > 1920) circleNum = 20;
		else if (w > 1600) circleNum = 15;
		else if (w > 1024) circleNum = 10;
		else circleNum = 7;
		for (var i = 0; i < circleNum; i++) {
			circles.push({
				x: canvas.width / 2,
				y: canvas.height / 2,
				angle: Math.PI * 2 * Math.random(),
				size: minSize + (maxSize - minSize) * Math.random(),
				speed: minSpeed + (maxSpeed - minSpeed) * Math.random()
			});
		}
	};

	var initOnResize = function() {
		var timer = null;
		window.addEventListener('resize', function() {
			if (timer === null) window.clearTimeout(timer);
			timer = window.setTimeout(function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				timer = null;
			}, 200);
		});
	};

	var draw = function() {
		context.beginPath();
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.closePath();
		for (var i = 0; i < circles.length; i++) {
			var c = circles[i];
			context.beginPath();
			context.fillStyle = color;
			context.arc(c.x, c.y, c.size, 0, Math.PI*2, false);
			context.fill();
			context.closePath();
		}
	};

	var move = (function() {
		var preTick = null;
		return function() {
			var canvasWidth = canvas.width;
			var canvasHeight = canvas.height;
			var tick = Date.now();
			if (preTick === null) preTick = tick;
			for (var i = 0; i < circles.length; i++) {
				var c = circles[i];
				var d = c.speed * (tick - preTick);
				var moveX = d * Math.cos(c.angle);
				var moveY = d * Math.sin(c.angle);
				c.x += moveX;
				c.y += moveY;
				if (c.x <= 0 || canvasWidth <= c.x) {
					c.angle = Math.atan2(moveY, -moveX);
					c.x = c.x <= 0 ? 0 : canvasWidth;
				}
				if (c.y <= 0 || canvasHeight <= c.y) {
					c.angle = Math.atan2(-moveY, moveX);
					c.y = c.y <= 0 ? 0 : canvasHeight;
				}
			}
			preTick = tick;
		};
	})();

	var startTimer = function() {
		var requestAnimationFrame = 
				window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		var requestFrame = function(loopFunc) {
			if (requestAnimationFrame) {
				requestAnimationFrame(loopFunc);
			} else {
				window.setTimeout(loopFunc, 33);
			}
		};
		var loopFunc = function() {
			try {
				move();
				draw();
			} catch (e) {
				console.log(e);
			}
			requestFrame(loopFunc);
		};
		requestFrame(loopFunc);
	};

})();

