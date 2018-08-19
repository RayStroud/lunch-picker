import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';
import { API } from 'aws-amplify';
import Moment from 'moment';
import './Lunches.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lunches: [],
    };
  }

  async componentDidMount() {
    try {
      const lunches = await this.lunches();
      this.setState({ lunches });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  lunches() {
    return API.get('api', `/${this.props.match.params.groupName}`);
  }

  renderLunchesList(lunches) {
    return [{}].concat(lunches.reverse()).map(
      (lunch, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={lunch.lunchDate}
            href={`/${lunch.groupName}/${lunch.lunchDate}`}
            onClick={this.handleLunchClick}
            header={Moment(lunch.lunchDate, 'YYYYMMDD').format('ddd MMM D, YYYY')}
          >
            {'Created at ' + new Moment(lunch.createdAt).format('h:mm A on ddd MMM D, YYYY')}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href={`/${this.props.match.params.groupName}/new`}
            onClick={this.handleLunchClick}
          >
            <h4>
              <b>{'\uFF0B'}</b> Add a new lunch
            </h4>
          </ListGroupItem>
        )
    );
  }

  handleLunchClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  };

  renderLunches() {
    return (
      <div className="Lunches">
        <PageHeader>Lunches</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderLunchesList(this.state.lunches)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
        this.renderLunches()
    );
  }
}
