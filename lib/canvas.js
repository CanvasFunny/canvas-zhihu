/**
 * Main part
 *
 * @date 17/4/9
 */
'use strict';

class CanvasZH {
	/**
	 * @param {Object} config - the config of the widget
	 * @param {String} config.elemId - the element's Id
	 * @param {Number} config.width - stage's width
	 * @param {Number} config.height - stage's height
	 * @param {Number} config.point - the number of the points
	 * @constructor
	 */
	constructor (config) {
		// config the canvas
		this.canvas = document.getElementById(config.elemId || 'Mycanvas');
		this.canvas.width = config.width || window.innerWidth;
		this.canvas.height = config.height || window.innerHeight;

		// config the context
		// TODO this part can be configed when initing CanvasZH
		this.context = canvas.getContext('2d');
		this.context.strokeStyle = 'rgba(0, 0, 0, 0.02)',
		this.context.strokeWidth = 1,
		this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';

		this.circleArr = [];
		this.point = config.point;
	}

	/**
	 * start the animation
	 */
	_start () {
		let circle;
		const height = this.canvas.height;
		const width = this.canvas.width;
		for (let i = 0; i < this.point; i++) {
			circle = {
				x: this._randNum(width),
				y: this._randNum(height),
				r: this._randNum(15, 2),
				moveX: this._randNum(10, -10)/40,
				moveY: this._randNum(10, -10)/40
			};
			this.circleArr.push(circle);
		}
		setInterval(() => {
			let circle;
			for (let i =0; i < this.point; i++) {
				circle = circleArr[i];
				circle.x += circle.moveX;
				circle.y += circle.moveY;
				if (circle.x > width) circle.x = 0;
				else if (circle.x < 0) circle.x = width;
				if (circle.y > height) circle.y = 0;
				else if (circle.y < 0) circle.y = height;
			}
		}, 15);
	}

	/**
	 * draw
	 * @private
	 */
	_draw () {
		this.context.clearReact(0, 0, this.canvas.width, this.canvas.height);

		// draw the lines
		for (let i = 0; i < this.point; i++) {
			this._drawCircle(circleArr[i]);
			for (let j = 0; j < this.point - i; j++) {
				const distanceX = Math.abs(circleArr[j].x - circleArr[i].x);
				const distanceY = Math.abs(circleArr[j].y - circleArr[i].y);
				const lineLength = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

				let lineOpacity = 1 / lineLength * 7 - 0.009;
				lineOpacity = lineOpacity > 0.03 ? 0.03 : lineOpacity;
				if (lineOpacity > 0) {
					this._drawLine({
						beginX: circleArr[i].x,
						beginY: circleArr[i].y,
						closeX: circleArr[j].x,
						closeY: circleArr[j].y,
						opacity: lineOpacity
					});
				}
			}
		}
	}

	/**
	 * randNum
	 * @param {Number} max - max
	 * @param {Number} min - min
	 * @return {Number}
	 * @private
	 */
	_randNum (max, min) {
		min = min || 0;
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * draw the circle
	 * @param {Object} config - the circle's config
	 * @param {Number} config.x - circle's X axe
	 * @param {Number} config.y - circle's Y axe
	 * @param {Number} config.r - circle's radius
	 * @private
	 */
	_drawCircle (config) {
		this.context.beginPath();
		this.context.arc(config.x, config.y, config.r, 0, 2 * Math.PI);
		this.context.closePath();
		this.context.fill();
		return;
	}

	/**
	 * draw the line
	 * @param {Object} config - the line's config
	 * @param {Number} config.beginX - line's begin X axe
	 * @param {Number} config.beginY - line's begin X axe
	 * @param {Number} config.closeX - line's end X axe
	 * @param {Number} config.closeY - line's end Y axe
	 * @param {Number} config.opacity - line's opacity
	 * @private
	 */
	_drawLine (config) {
		this.context.beginPath();
		this.context.strokeStyle = `rgba(0, 0, 0, ${ config.opacity })`;
		this.context.moveTo(config.beginX, config.beginY);
		this.context.lineTo(config.closeX, config.closeY);
		this.context.closePath();
		this.context.stroke();
		return;
	}
}

module.exports = CanvasZH;