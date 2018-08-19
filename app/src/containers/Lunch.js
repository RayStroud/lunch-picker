import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { Auth, API } from 'aws-amplify';
import './Lunch.css';

// const VoteButton = ({ location, glyph, voteValue, onClick }) => {
//   // const highlighted = location.countedVotes.userVote === voteValue;
//   // console.log(`location: ${JSON.stringify(location)}`);
//   // console.log(`onClick: ${JSON.stringify(onClick)}`);
//   return (
//     <Button onClick={() => onClick(location.locationName, voteValue)}>
//       <Glyphicon glyph={glyph} />
//     </Button>
//   );
// }

// const VoteButtons = ({ location, onClick }) => {(
//   <ButtonGroup>
//     <VoteButton location={{location}} glyph="star" voteValue="Fav" onClick={onClick} />
//     <VoteButton location={{location}} glyph="thumbs-up" voteValue="Like" onClick={onClick} />
//     <VoteButton location={{location}} glyph="thumbs-down" voteValue="Dislike" onClick={onClick} />
//     <VoteButton location={{location}} glyph="ban-circle" voteValue="Reject" onClick={onClick} />
//   </ButtonGroup>
// )}

export default class Lunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      userFavLocation: [],
    };
    this.params = props.match.params;
  }

  async componentDidMount() {
    try {
      const userInfo = await Auth.currentUserInfo();
      const locations = await this.listLocations(userInfo.id);
      this.setState({ locations, userInfo });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  async listLocations(userId) {
    const locations = await API.get('api', `/${this.params.groupName}/${this.params.lunchDate}`);
    const userFavLocation = [];
    locations.map((location) => {
      location.countedVotes = this.getCountedVotes(location.votes, userId);
      if (location.countedVotes.userVote === 'Fav') {
        userFavLocation.push(location.locationName);
      }
      return location;
    });
    this.setState({ userFavLocation })
    return locations;
  }

  handleNewLocationClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  };

  handleVoteClick = async (locationName, voteValue) => {
    try {
      if (voteValue === 'Fav') {
        this.state.userFavLocation.map(async (fav) => {
          await this.addVote(fav, 'Like');
        });
      }
      await this.addVote(locationName, voteValue);
      const locations = await this.listLocations(this.state.userInfo.id);
      this.setState({ locations });
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  addVote(locationName, voteValue) {
    const path = `/${this.params.groupName}/${this.params.lunchDate}/${locationName}`;
    const body = { voteValue, email: this.state.userInfo.attributes.email }
    return API.post('api', path, { body });
  }

  getLocation(locationName) {
    const path = `/${this.params.groupName}/${this.params.lunchDate}/${locationName}`;
    return API.get('api', path);
  }

  getCountedVotes(votes, userId) {
    const countedVotes = { userVote: null, totalVotes: 0, ratedVotes: 0 };
    const voteEntries = Object.entries(votes, userId);
    for (let i = 0; i < voteEntries.length; i++ ) {
      const voteValue = voteEntries[i][1].voteValue;
      countedVotes[voteValue] = countedVotes[voteValue] ? countedVotes[voteValue] + 1 : 1;
      if (voteEntries[i][0] === userId) {
        countedVotes.userVote = voteValue;
      }
      if (voteValue === 'Fav') {
        countedVotes.totalVotes++;
        countedVotes.ratedVotes = countedVotes.ratedVotes + 1.01;
      }
      if (voteValue === 'Like') {
        countedVotes.totalVotes++;
        countedVotes.ratedVotes = countedVotes.ratedVotes + 1.001;
      }
      if (voteValue === 'Dislike') {
        countedVotes.totalVotes++;
        countedVotes.ratedVotes = countedVotes.ratedVotes - 1;
      }
      if (voteValue === 'Reject') {
        countedVotes.totalVotes++;
        countedVotes.ratedVotes = countedVotes.ratedVotes - 1.0001;
      }
    }
    return countedVotes;
  }

  renderCountedVotes(countedVotes) {
    const voteGlyphicons = [];
    for (let i = 0; i < countedVotes['Fav']; i++ ) {
      voteGlyphicons.push(<Glyphicon glyph="star" key={`Fav${i}`} />);
    }
    for (let i = 0; i < countedVotes['Like']; i++ ) {
      voteGlyphicons.push(<Glyphicon glyph="thumbs-up" key={`Like${i}`} />);
    }
    for (let i = 0; i < countedVotes['Dislike']; i++ ) {
      voteGlyphicons.push(<Glyphicon glyph="thumbs-down" key={`Dislike${i}`} />);
    }
    for (let i = 0; i < countedVotes['Reject']; i++ ) {
      voteGlyphicons.push(<Glyphicon glyph="ban-circle" key={`Reject${i}`} />);
    }
    return (<span className="vote-glyph-container">{voteGlyphicons}</span>);
  }

  renderVoteButtons(location) {
    return (
      <ButtonGroup>
        <Button
          bsStyle={location.countedVotes.userVote === 'Fav' ? 'success' : 'default'}
          onClick={() => this.handleVoteClick(location.locationName, 'Fav')}
        >
          <Glyphicon glyph="star" />
        </Button>
        <Button
          bsStyle={location.countedVotes.userVote === 'Like' ? 'info' : 'default'}
          onClick={() => this.handleVoteClick(location.locationName, 'Like')}
        >
          <Glyphicon glyph="thumbs-up" />
        </Button>
        <Button
          bsStyle={location.countedVotes.userVote === 'Dislike' ? 'warning' : 'default'}
          onClick={() => this.handleVoteClick(location.locationName, 'Dislike')}
        >
          <Glyphicon glyph="thumbs-down" />
        </Button>
        <Button
          bsStyle={location.countedVotes.userVote === 'Reject' ? 'danger' : 'default'}
          onClick={() => this.handleVoteClick(location.locationName, 'Reject')}
        >
          <Glyphicon glyph="ban-circle" />
        </Button>
        <Button
          bsStyle="link"
          onClick={() => this.handleVoteClick(location.locationName, 'Deleted')}
        >
          Delete Vote
        </Button>
      </ButtonGroup>
    );
  }

  renderLocationsList(locations) {
    return [{}].concat(locations.sort((a, b) => {
        const order = b.countedVotes.ratedVotes - a.countedVotes.ratedVotes;
        return order;
      })).map(
      (location, i) =>
        i !== 0 ? (
          <ListGroupItem key={location.locationName}>
            <h4>{location.locationName} <small>{this.renderCountedVotes(location.countedVotes)}</small></h4>
            <p>{location.description}</p>
            {this.renderVoteButtons(location)}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href={`/${this.props.match.params.groupName}/${this.props.match.params.lunchDate}/new`}
            onClick={this.handleNewLocationClick}
          >
            <h4>
              <b>{'\uFF0B'}</b> Add a different location
            </h4>
          </ListGroupItem>
        )
    );
  }

  render() {
    return (
      <div className="Locations">
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        <h1>Locations</h1>
        <p>Vote for them all!</p>
        <p>Pick your #1 choice with <Glyphicon glyph="star" />. If there's somewhere you won't go, use <Glyphicon glyph="ban-circle" />.</p>
        <hr></hr>
        <ListGroup>
          {!this.state.isLoading && this.renderLocationsList(this.state.locations)}
        </ListGroup>
      </div>
    );
  }
}
