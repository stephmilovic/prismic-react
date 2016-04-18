import React from 'react';
const Prismic = require('prismic.io');
import store from '../../flux/store';
import actions from '../../flux/actions';


function linkResolver(doc) {
	return '/' + doc.type + '/' + doc.id;
}

export default class Cool extends React.Component {
	constructor(props) {
		super(props);
		this.renderDescription = this.renderDescription.bind(this);
		this.getEventInfo = this.getEventInfo.bind(this);
		actions.loadEventInfo();
		this.state = {
			doc: null
		};
	}
	componentWillMount() {
		store.on('event_loadEventInfo', this.getEventInfo);
	}

	getEventInfo() {
		console.log(store.getEventInfo());
		this.setState({
			doc: store.getEventInfo()
		});
	}
	renderDescription(doc) {
		const html = doc.getStructuredText('event-info.description').asHtml();
		// return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
// <div dangerouslySetInnerHTML={{__html: this.state.doc.asHtml(linkResolver)}} />
// Cool.propTypes = {
// 	params: React.PropTypes.object.isRequired,
// 	linkResolver: React.PropTypes.func.isRequired,
// 	endpoint: React.PropTypes.string.isRequired,
// 	accesstoken: React.PropTypes.string
// };
