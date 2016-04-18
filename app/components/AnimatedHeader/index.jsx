import React from 'react';
import styles from './animated';
import Button from '../Button';

const confettis = [];

export default class AnimatedHeader extends React.Component {
	constructor(props) {
		super(props);
		this.renderConfetti = this.renderConfetti.bind(this);
		this.updateConfetti = this.updateConfetti.bind(this);
		this.loopConfetti = this.loopConfetti.bind(this);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			nConfetti: 75
		};
	}
	componentDidMount() {
		this.refs.cvn.setAttribute('width', this.state.width);
		this.refs.cvn.setAttribute('height', this.state.height);

		const confettiSpeed = 5;
		for (let i = 0; i < this.state.nConfetti; i++) {
			const t = new this.MakeConfetti(Math.random() * this.state.width, Math.random() * this.state.height, 1 + Math.random() * 5, 1 + Math.random() * 5, this.state.width, this.state.height, this.refs.cvn);
			t.sx = Math.random() * confettiSpeed * 2 - confettiSpeed;
			t.sy = Math.random() * confettiSpeed + confettiSpeed;
			confettis[i] = t;
		}
		this.loopConfetti();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	MakeConfetti(x, y, rx, ry, sWidth, sHeight, cvn) {
		function randomRange(min, max) {
			return min + Math.random() * (max - min);
		}
		function convertToRadians(degree) {
			return degree * (Math.PI / 180);
		}
		const colors = [
			'#007f8f', '#84DCC6', '#c1f2e6', '#d7fcec',
			'#ffebe8', '#ffd8d8', '#ffdde0', '#ffe8e8', '#FFE099'
		];
		this.x = sWidth / 2;
		this.y = sHeight / 2.4;
		this.sx = 0;
		this.sy = 0;
		this.rx = rx;
		this.ry = ry;
		this.boxW = randomRange(5, 20);
		this.boxH = randomRange(5, 20);
		this.size = randomRange(2, 8);
		this.spikeran = randomRange(3, 5);
		this.velX = randomRange(-8, 8);
		this.velY = randomRange(-50, -10);
		this.angle = convertToRadians(randomRange(0, 360));
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.anglespin = randomRange(-0.2, 0.2);
		this.draw = function () {
			const context = cvn.getContext('2d');
			context.save();
			context.translate(this.x, this.y);
			context.rotate(this.angle);
			context.fillStyle = this.color;
			context.beginPath();
			context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
			context.fill();
			context.closePath();
			context.restore();
			this.angle += this.anglespin;
			this.x += this.velX;
			this.y += this.velY;
			if (this.y < 0) {
				this.velY *= -0.2;
				this.velX *= 0.1;
			}
		};
	}

	loopConfetti() {
		this.renderConfetti();
		this.updateConfetti();
		requestAnimationFrame(this.loopConfetti, this.refs.cnv);
	}

	updateConfetti() {
		for (let i = 0; i < this.state.nConfetti; i++) {
			confettis[i].x += confettis[i].sx;
			confettis[i].y += confettis[i].sy;
			if (confettis[i].x > this.state.width) {
				confettis[i].x = 0;
			} else if (confettis[i].x < 0) {
				confettis[i].x = this.state.width;
			}
			if (confettis[i].y > this.state.height) {
				confettis[i].y = 0;
			}
		}
	}

	renderConfetti() {
		const context = cvn.getContext('2d');
		const oldArray = context.getImageData(0, 0, this.state.width, this.state.height);
		for (let d = 3; d < oldArray.data.length; d += 4) {
			oldArray.data[d] = Math.floor(oldArray.data[d] * 0.000001);
		}
		context.putImageData(oldArray, 0, 0);
		for (let i = 0; i < this.state.nConfetti; i++) {
			confettis[i].draw(context);
		}
	}


	render() {
		return (
			<div className={styles.animate}>
				<canvas id="cvn" ref="cvn" />
				<div className={styles.contain}>
					<div />
					<div className={styles.frame}>
						<div className={styles.circle}></div>
						<div className={styles.lineLeft}></div>
						<div className={styles.lineRight}></div>
						<div className={styles.bracketLeft}></div>
						<div className={styles.bracketRight}></div>
						<div className={styles.smallTop}>August 13, 2016</div>
						<div className={styles.big}>#PLISKOVIC<br />PARTY</div>
						<div className={styles.smallBottom}>Chicago</div>
						<div className={styles.hideTop}></div>
						<div className={styles.hideBottom}></div>
					</div>
					<div className={styles.button}><Button type="button" label="RSVP" cbStyle="major" /></div>
				</div>
			</div>
		);
	}
}
