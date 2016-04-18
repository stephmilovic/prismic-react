import React, { PropTypes } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Countdown from '../Countdown';
import { prismicByType } from '../../vendor/prismic-es6';
import styles from './intro';

export default class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.renderIntro = this.renderIntro.bind(this);
		this.state = {
			doc: null
		};
	}

	componentDidMount() {
		prismicByType(this.props.api, 'intro').then(res => {
			if (res.results.length > 0) {
				this.setState({ doc: res.results[0] });
			} else {
				this.setState({ notFound: true });
			}
		});
	}
	renderIntro(doc) {
		const html = doc.getStructuredText('intro.description').asHtml();
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}

	render() {
		if (!this.state.doc) {
			return (<div>Loading...</div>);
		}
		return (
			<Row className={styles.row}>
				<Col xs={7} sm={7} md={8} lg={9} className={styles.welcome}>
					{this.renderIntro(this.state.doc)}
				</Col>
				<Col xs={5} sm={5} md={4} lg={3} className={styles.counter}>
					<p>The ceremony begins in:</p>
					<Countdown givenDate = {"Saturday August 13 2016 17:00:00 GMT-0500 (CDT)"} />
				</Col>
			</Row>
		);
	}
}

Intro.propTypes = {
	children: PropTypes.node
};
