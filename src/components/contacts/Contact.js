import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteContact } from "../../actions/contactActions";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onKeyToggle = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({ showContactInfo: !this.state.showContactInfo });
    }
  };

  onClickToggle = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onKeyDelete = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.props.deleteContact(id);
    }
  };

  onClickDelete = id => {
    this.props.deleteContact(id);
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <div className="card card-body mb-3">
        <div className="card-title">
          <h4>{name}</h4>
          <button
            onClick={this.onClickToggle}
            onKeyPress={this.onKeyToggle}
            className="btn btn-primary ml-3"
            aria-expanded={showContactInfo}
            aria-pressed={showContactInfo}
          >
            <span
              className={
                showContactInfo
                  ? "fas fa-sort-up mr-2"
                  : "fas fa-sort-down mr-2"
              }
            />
            {showContactInfo ? "Hide Details" : "Show Details"}
          </button>
          <button className="btn btn-outline-secondary ml-auto edit">
            <span className="fas fa-pencil-alt mr-2" />
            <Link to={`contact/edit/${id}`}>Edit Contact</Link>
          </button>
          <button
            className="btn btn-danger ml-1"
            onClick={this.onClickDelete.bind(this, id)}
            onKeyPress={this.onKeyDelete.bind(this, id)}
          >
            <span className="fas fa-times mr-2" />
            Delete Contact
          </button>
        </div>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Phone: {phone}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteContact }
)(Contact);
