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
	//	actions.loadEventInfo();
		this.state = {
			doc: null
		};
	}
	componentWillMount() {
debugger;
		this.props.api.form('everything').query(Prismic.Predicates.at('document.type', 'event-info')).ref(this.prismicApi.master()).submit((err, res) => {
			this.eventInfo = res.results[0];
			this.emit('event_loadEventInfo');
		});
		store.on('event_loadEventInfo', this.getEventInfo);
	}

	getEventInfo() {
		console.log(store.getEventInfo());
		this.setState({
			doc: store.getEventInfo()
		});
	}
	renderDescription(doc) {
		debugger;
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
Cool.propTypes = {
	api: React.PropTypes.object
};
