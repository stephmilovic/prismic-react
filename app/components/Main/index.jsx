import React from 'react';
import { Container, Content, Header, Footer } from '../Layout';
import EventInfo from '../Cooler';
import { prismicApi } from '../../vendor/prismic-es6';

const endpoint = 'http://pliskovicparty.prismic.io/api';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { api: null };
	}
	componentDidMount() {
		prismicApi(endpoint).then((api) => this.setState({ prismicApi: api }));
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
						<EventInfo api={this.state.prismicApi} />
					</Content>

				</Container>
				<Footer />
			</div>
		);
	}
}
