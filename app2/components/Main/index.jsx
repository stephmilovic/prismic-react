import React from 'react';
import { Container, Content, Header, Footer } from '../Layout';

export default class Main extends React.Component {
  render() {
    return (
			<div>
				<Header />
				<Container>
					<Content>Let's do this shit!!</Content>

				</Container>
				<Footer />
			</div>
		);
  }
}
