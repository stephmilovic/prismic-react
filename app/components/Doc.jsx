import React from 'react';
import { prismicApi, prismicByID } from '../vendor/prismic-es6';
import Container from './Container';
import Cool from './Cool';
import Button from './Button';

const TagList = (props) => (
	<ul>
	{props.doc.tags.map((doc, i) => {
		return (<li key={i}>
		{doc}
		</li>);
	})}
	</ul>
);

export default class Doc extends React.Component {

	constructor(props) {
		super(props);
		this.renderDescirption = this.renderDescirption.bind(this);
		this.state = {
			notFound: false,
			doc: null
		};
	}

	componentDidMount() {
		prismicApi(this.props.endpoint, this.props.accessToken).then(api => {
			return prismicByID(api, this.props.params.id);
		}).then(res => {
			if (res.results.length > 0) {
				this.setState({ doc: res.results[0] });
			} else {
				this.setState({ notFound: true });
			}
		});
	}
	renderDescirption(doc) {
		const html = doc.getStructuredText('event-info.description').asHtml(this.props.linkResolver);
		return <div dangerouslySetInnerHTML={{ __html: html }} />;
	}

	render() {
		if (this.state.notFound) {
			return (<div>Document not found</div>);
		} else if (!this.state.doc) {
			return (<div>Loading...</div>);
		}
		//debugger;
		return (
			<div>
				<h1>Hello</h1>
				{this.renderDescirption(this.state.doc)}
				<TagList doc={this.state.doc} />
			</div>
		);
	}
}

Doc.propTypes = {
	params: React.PropTypes.object.isRequired,
	linkResolver: React.PropTypes.func.isRequired,
	endpoint: React.PropTypes.string.isRequired,
	accesstoken: React.PropTypes.string
};

