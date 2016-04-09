import React from 'react';
import { Container, Content, Header, Footer } from '../Layout';
import Cool from '../Cool';
import store from '../../flux/store';
import actions from '../../flux/actions';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.getApi = this.getApi.bind(this);
		this.state = { api: null };
		actions.loadPageData();
	}
	componentWillMount() {
		store.on('event_loadApi', this.getApi);
	}
	getApi() {
		this.setState({
			api: store.getPrismicApi()
		});
	}

	render() {
		if (!this.state.api) {
			return (<div>Loading...</div>);
		}
		return (
			<div>
				<Header />
				<Container>
				<Content>Let's do this shit!!
					<Cool />
				</Content>

				</Container>
				<Footer />
			</div>
		);
	}
}
