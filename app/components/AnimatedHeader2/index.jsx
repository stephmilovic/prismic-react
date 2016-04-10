import React from 'react';
import ReactDOM from 'react-dom';
import styles from './animated';
import Trianglify from 'trianglify';
import Button from '../Button';


export default class AnimatedHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleResize = this.handleResize.bind(this);
		this.state = {
			w: window.innerWidth,
			h: window.innerHeight
		};
	}
	componentDidMount() {
		this.renderCanvas();
		window.addEventListener('resize', this.handleResize);
	}
	shouldComponentUpdate(nextProps, nextState) {
		for (const key in nextProps) {
			if (this.props[key] !== nextProps[key]) {
				return true;
			}
		}
		return false;
	}
	componentDidUpdate() {
		this.renderCanvas();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	handleResize() {
		this.setState({
			w: window.innerWidth,
			h: window.innerHeight
		});
		this.renderCanvas();
	}

	renderCanvas() {
		const canvas = document.getElementById('loading');
		const pattern = Trianglify({
			cell_size: 70,
			variance: 0.8,
			x_colors: ['#E8518D', '#E87EA1', '#FFB5B9', '#eeffff', '#44D6DE', '#12a2b5'],
			//x_colors: ['#C62968', '#E8518D', '#E87EA1', '#FFB5B9', '#FFD8D8', '#eeffff', '#44D6DE', '#12a2b5', '#208cbf', '#1887b2'],
			//x_colors: ['#C62968', '#E8518D', '#E87EA1', '#FFB5B9', '#FFD8D8'],
			height: this.state.h,
			width: this.state.w
		});
		pattern.canvas(canvas);
	}

	render() {
		return (
			<div className={styles.animate}>
				<canvas id="loading" />
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
