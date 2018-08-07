import React, { Component } from "react";
import FormInputGroup from "../layout/FormInputGroup";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addContact } from "../../actions/contactActions";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required." } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required." } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required." } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    this.props.addContact(newContact);

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div className="card mp-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit.bind(this)}>
            <FormInputGroup
              label="Name"
              name="name"
              placeholder="Enter your name..."
              value={name}
              onChange={this.onInputChange}
              error={errors.name}
            />
            <FormInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={this.onInputChange}
              error={errors.email}
            />
            <FormInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter your phone..."
              value={phone}
              onChange={this.onInputChange}
              error={errors.phone}
            />

            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { addContact }
)(AddContact);
