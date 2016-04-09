import React from 'react';
import { prismicByType } from '../../vendor/prismic-es6';


export default class EventInfo extends React.Component {
	constructor(props) {
		super(props);
		this.renderDescription = this.renderDescription.bind(this);
		this.state = {
			doc: null
		};
	}

	componentDidMount() {
		prismicByType(this.props.api, 'event-info').then(res => {
			if (res.results.length > 0) {
				this.setState({ doc: res.results[0] });
			} else {
				this.setState({ notFound: true });
			}
		});
	}
	renderDescription(doc) {
		const html = doc.getStructuredText('event-info.description').asHtml();
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}
	render() {
		if (!this.state.doc) {
			return (<div>Loading...</div>);
		}
		return (
			<div>
				<h1>Hello</h1>
				{this.renderDescription(this.state.doc)}
			</div>
		);
	}
}

EventInfo.propTypes = {
	api: React.PropTypes.object.isRequired
};
