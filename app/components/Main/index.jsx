import React from 'react';
import { Container, Content, Header, Footer } from '../Layout';
import EventInfo from '../EventInfo';
import HeaderContent from '../HeaderContent';
import AnimatedHeader from '../AnimatedHeader2';
import { prismicApi } from '../../vendor/prismic-es6';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = { prismicApi: null };
	}
	componentWillMount() {
		prismicApi().then((api) => this.setState({ prismicApi: api }));
	}
	render() {
		if (!this.state.prismicApi) {
			return (<div>Loading...</div>);
		}
		return (
			<div>
				<Header>
					<HeaderContent />
				</Header>
				<Container>
					<AnimatedHeader />
					<Grid>
						<Col xs={12}>
							<Row center="xs">
								<Col xs={6}>
									<EventInfo api={this.state.prismicApi} />
								</Col>
							</Row>
						</Col>
					</Grid>
				</Container>
				<Footer />
			</div>
		);
	}
}
