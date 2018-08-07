import React, { Component } from "react";
import FormInputGroup from "../layout/FormInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getContact, updateContact } from "../../actions/contactActions";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone } = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

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

    const { id } = this.props.match.params;

    const updateThisContact = {
      id,
      name,
      email,
      phone
    };

    this.props.updateContact(updateThisContact);

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
        <div className="card-header">Edit Contact</div>
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
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);
