import React from 'react';
import store from '../../flux/store';
import actions from '../../flux/actions';

// function linkResolver(doc) {
// 	return '/' + doc.type + '/' + doc.id;
// }

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
		this.setState({
			doc: store.getEventInfo()
		});
	}
	renderDescription(doc) {
		 debugger;
		// const html = doc.getStructuredText('event-info.description').asHtml();
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

// Cool.propTypes = {
// 	params: React.PropTypes.object.isRequired,
// 	linkResolver: React.PropTypes.func.isRequired,
// 	endpoint: React.PropTypes.string.isRequired,
// 	accesstoken: React.PropTypes.string
// };
