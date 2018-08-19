import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import LoaderButton from '../components/LoaderButton';
import './NewLunch.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class NewLunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      lunchDate: Moment().format('ddd MMM D, YYYY'),
    };
  }

  validateForm() {
    return Moment(this.state.lunchDate).isValid();
  }

  handleChange = (moment) => {
    this.setState({
      lunchDate: moment.format('ddd MMM D, YYYY'),
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await this.addLunch({ lunchDate: Moment(this.state.lunchDate).format('YYYYMMDD') });
      this.props.history.push(`/${this.props.match.params.groupName}`);
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  addLunch(params) {
    return API.post('api', `/${this.props.match.params.groupName}`, { body: params });
  }

  render() {
    return (
      <div className="NewLunch">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <DatePicker
              onChange={(moment) => this.handleChange(moment)}
              selected={Moment(this.state.lunchDate)}
              value={this.state.lunchDate}
              className="form-control"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Add New Lunch"
            loadingText="Adding Lunch..."
          />
        </form>
      </div>
    );
  }
}
