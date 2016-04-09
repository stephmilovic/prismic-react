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
        this.setState({doc: res.results[0]});
      } else {
        this.setState({notFound: true});
      }

    });

  }


  render() {
    if (this.state.notFound) {
      return (<div>Document not found</div>);
    } else if (!this.state.doc) {
      return (<div>Loading...</div>);
    } else {
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.state.doc.asHtml(this.props.linkResolver)}} />
          <TagList doc={this.state.doc} />
          <Container />
          <Cool />
          <Button type="major" label="Hell yeah dude" />
          <Button type="minor" label="Hell yeah dude" />
        </div>
      );
    }
  }

}

Doc.propTypes = {
  params: React.PropTypes.object.isRequired,
  linkResolver: React.PropTypes.func.isRequired,
  endpoint: React.PropTypes.string.isRequired,
  accesstoken: React.PropTypes.string
};

