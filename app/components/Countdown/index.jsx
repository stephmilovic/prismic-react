import React, { PropTypes } from 'react';
import styles from './countdown';
import { Row, Col } from 'react-flexbox-grid';

export default class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.renderTime = this.renderTime.bind(this);
		this.state = {
			time: new Date(this.props.givenDate) / 1000
		};
	}

	componentDidMount() {
		this.decr = setInterval(this.update, 1000);
	}

	update() {
		const newTime = this.state.time - 1; // minus one sec from initial time
		this.setState({ time: newTime });
		if (this.state.time === 0) {
			clearInterval(this.decr);
		}
	}
	renderTime() {
		const formattedGivenDate = new Date(this.props.givenDate);
		const today = new Date();
		const msDiff = formattedGivenDate - today;
		const days = parseInt(msDiff / (24 * 3600 * 1000), 10);
		const hours = parseInt(msDiff / (3600 * 1000) - (days * 24), 10);
		const mins = parseInt(msDiff / (60 * 1000) - (days * 24 * 60) - (hours * 60), 10);
		const secs = parseInt(msDiff / (1000) - (mins * 60) - (days * 24 * 60 * 60) - (hours * 60 * 60), 10);
		return (
			<div>
				<Row>
					<Col className={styles.col} xs={3}><div className={styles.timeBox}>{days}</div></Col><Col className={styles.col} xs={3}><div className={styles.timeBox}>{hours}</div></Col><Col className={styles.col} xs={3}><div className={styles.timeBox}>{mins}</div></Col><Col className={styles.col} xs={3}><div className={styles.timeBox}>{secs}</div></Col>
				</Row>
				<Row>
					<Col className={styles.col} xs={3}><div className={styles.timeType}>Days</div></Col><Col className={styles.col} xs={3}><div className={styles.timeType}>Hours</div></Col><Col className={styles.col} xs={3}><div className={styles.timeType}>Minutes</div></Col><Col className={styles.col} xs={3}><div className={styles.timeType}>Seconds</div></Col>
				</Row>
			</div>
		);


//		 { days } + ' D ' + hours + ' H ' + /\\n/g + mins + ' M ' + secs + ' S ';
	}

	render() {
		return (
			<div className="react-countdown-container">
				{this.renderTime()}
			</div>
		);
	}
}

Countdown.propTypes = {
	givenDate: PropTypes.string.isRequired
};
