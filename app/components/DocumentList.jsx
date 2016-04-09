import React from 'react';
import { Link } from 'react-router';
import { Prismic } from 'prismic.io';

const DocumentList = (props) => (
  <ul>
    {props.docs.map((doc) =>
      <li key={doc.id}>
				<Link to={props.linkResolver(doc)}>{doc.slug}</Link>
      </li>
    )}
  </ul>
);
DocumentList.propTypes = {
  docs: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Prismic.Document)).isRequired,
  linkResolver: React.PropTypes.func.isRequired
};

export default class DocumentListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { docs: [] };
  }

  componentDidMount() {
    this.props.api.form('everything').ref(this.props.api.master()).submit((err, res) => {
      this.setState({ docs: res.results });
    });
    debugger;
  }

  render() {
    return <DocumentList endpoint={this.props.endpoint} docs={this.state.docs} linkResolver={this.props.linkResolver} />;
  }

}

DocumentListContainer.propTypes = {
  api: React.PropTypes.instanceOf(Prismic.Api),
  endpoint: React.PropTypes.string.isRequired,
  accesstoken: React.PropTypes.string,
  linkResolver: React.PropTypes.func.isRequired,
  q: React.PropTypes.string // Prismic query
};
