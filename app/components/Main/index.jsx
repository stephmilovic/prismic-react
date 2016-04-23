import React from 'react';
import { Container, Content, Header, Footer } from '../Layout';
import EventInfo from '../EventInfo';
import Brides from '../Brides';
import Intro from '../Intro';
import Proposal from '../Proposal';
import HeaderContent from '../HeaderContent2';
import AnimatedHeader from '../AnimatedHeader';
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
				<Container>
					<AnimatedHeader />
					<HeaderContent />
					<Grid>
						<Content>
							<div className="wedSection intro"><Intro api={this.state.prismicApi} /></div>
							<div className="wedSection intro"><Brides api={this.state.prismicApi} /></div>
							<div className="wedSection proposal"><Proposal api={this.state.prismicApi} /></div>
						</Content>
					</Grid>
				</Container>
				<Footer />
			</div>
		);
	}
}
