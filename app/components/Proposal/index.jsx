import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { prismicByType } from '../../vendor/prismic-es6';
import styles from './proposal';


export default class Proposal extends React.Component {
	constructor(props) {
		super(props);
		this.renderProposal = this.renderProposal.bind(this);
		this.state = {
			doc: null
		};
	}

	componentDidMount() {
		prismicByType(this.props.api, 'proposal').then(res => {
			if (res.results.length > 0) {
				this.setState({ doc: res.results[0] });
			} else {
				this.setState({ notFound: true });
			}
		});
	}
	renderProposal(doc) {
		const proposal = doc.getStructuredText('proposal.description').asHtml();
		const proposalImg = doc.getImage('proposal.image').asHtml();
		return (<Row>
				<Col xs={12} sm={6} id="steph">
					<div dangerouslySetInnerHTML={{ __html: proposal }} />
				</Col>
				<Col xs={12} sm={6} id="sarah">
					<div className={styles.picture} dangerouslySetInnerHTML={{ __html: proposalImg }} />

				</Col>
			</Row>);
	}
	render() {
		if (!this.state.doc) {
			return (<div>Loading...</div>);
		}
		return (
			<div>
				<h1>Proposal</h1>
				{this.renderProposal(this.state.doc)}
			</div>
		);
	}
}

Proposal.propTypes = {
	api: React.PropTypes.object.isRequired
};
