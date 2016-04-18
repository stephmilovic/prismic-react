import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { prismicByType } from '../../vendor/prismic-es6';
import styles from './brides';


export default class Brides extends React.Component {
	constructor(props) {
		super(props);
		this.renderBrides = this.renderBrides.bind(this);
		this.state = {
			doc: null
		};
	}

	componentDidMount() {
		prismicByType(this.props.api, 'brides').then(res => {
			if (res.results.length > 0) {
				this.setState({ doc: res.results[0] });
			} else {
				this.setState({ notFound: true });
			}
		});
	}
	renderBrides(doc) {
		const brides = doc.getGroup('brides.brides').toArray();
		const steph = brides[0];
		const sarah = brides[1];
		const stephName = steph.getText('name');
		const stephDescription = steph.getStructuredText('description').asHtml();
		const stephImg = steph.getImage('picture').asHtml();
		const sarahName = sarah.getText('name');
		const sarahDescription = sarah.getStructuredText('description').asHtml();
		const sarahImg = sarah.getImage('picture').asHtml();
		return (<Row>
				<Col xs={12} sm={6} id="steph">
					<div className={styles.picture} dangerouslySetInnerHTML={{ __html: sarahImg }} />
					<h4>{sarahName}</h4>
					<div dangerouslySetInnerHTML={{ __html: sarahDescription }} />
				</Col>
				<Col xs={12} sm={6} id="sarah">
					<div className={styles.picture} dangerouslySetInnerHTML={{ __html: stephImg }} />
					<h4>{stephName}</h4>
					<div dangerouslySetInnerHTML={{ __html: stephDescription }} />
				</Col>
			</Row>);
	}
	render() {
		if (!this.state.doc) {
			return (<div>Loading...</div>);
		}
		return (
			<div>
				<h1>Here Comes the Brides</h1>
				{this.renderBrides(this.state.doc)}
			</div>
		);
	}
}

Brides.propTypes = {
	api: React.PropTypes.object.isRequired
};
