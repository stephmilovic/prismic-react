import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { prismicApi } from './vendor/prismic-es6';
import DocumentListContainer from './components/DocumentList';
import Doc from './components/Doc';
import Main from './components/Main';
import styles from './sass/global/global.scss';

// Update these 2 constants to point to your repository
const endpoint = 'http://pliskovicparty.prismic.io/api';
const accessToken = null;

// Also change the linkResolver if you change the URL scheme in the Router below
function linkResolver(doc) {
  return '/' + doc.type + '/' + doc.id;
}

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { api: null };
  }
  componentDidMount() {
    prismicApi(endpoint).then((api) => this.setState({api: api}));
  }
  render() {
    if (!this.state.api) {
      return (<div>Loading...</div>);
    }
    return (<DocumentListContainer
                api={this.state.api}
                endpoint={endpoint}
                accesstoken={accessToken}
                linkResolver={linkResolver}
            />);
  }
}

function DocWrapper(props) {
  return <Doc params={props.params} endpoint={endpoint} accesstoken={accessToken} linkResolver={linkResolver} />;
}

function NoMatch(props) {
  return <div>Not found</div>;
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path=":type/:id" component={DocWrapper}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.querySelector('#app'));
