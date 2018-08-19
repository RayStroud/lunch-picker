import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { API } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import './NewLocation.css';

export default class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      locationName: '',
      description: '',
    };
  }

  validateForm() {
    return this.state.locationName.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const location =
      this.state.description.length > 0
        ? {
            locationName: this.state.locationName,
            description: this.state.description,
          }
        : {
            locationName: this.state.locationName,
          };

    try {
      await this.addLocation(location);
      this.props.history.push(
        `/${this.props.match.params.groupName}/${
          this.props.match.params.lunchDate
        }`
      );
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  addLocation(params) {
    return API.post(
      'api',
      `/${this.props.match.params.groupName}/${
        this.props.match.params.lunchDate
      }`,
      { body: params }
    );
  }

  render() {
    return (
      <div className="NewLocation">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="locationName">
            <FormControl
              type="text"
              placeholder="Location Name"
              onChange={this.handleChange}
              value={this.state.locationName}
            />
          </FormGroup>
          <FormGroup controlId="description">
            <FormControl
              type="text"
              placeholder="Description (Optional)"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Add Location"
            loadingText="Adding Location..."
          />
        </form>
      </div>
    );
  }
}
