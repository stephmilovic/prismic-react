import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Main from './components/Main';
import styles from './sass/global/global.scss';

export class App extends React.Component {
	render() {
		return (
			<div>
			<h1>Prismic.io + ReactJS</h1>
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
), document.querySelector('#app'));
