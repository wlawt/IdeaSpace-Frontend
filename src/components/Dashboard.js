import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { submitProfile } from "../actions/userActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      profilePic: "",
      bgPic: "",
      bioInfo: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      github: ""
    };
  }

  componentDidMount() {
    /* axios
      .get("/api/products")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err)); */
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      profilePic: this.state.profilePic,
      bgPic: this.state.bgPic,
      bioInfo: this.state.bioInfo,
      instagram: this.state.instagram,
      github: this.state.github,
      linkedin: this.state.linkedin,
      facebook: this.state.facebook,
      id: this.props.auth.users
    };

    /* console.log(this.props.auth.users); */

    this.props.submitProfile(profileData, this.props.history);
  };

  render() {
    const {
      profilePic,
      bgPic,
      bioInfo,
      instagram,
      github,
      linkedin,
      facebook
    } = this.state;

    return (
      /* Check if dashboard model is empty or not and display create one, or just show the actual profile */
      <div className="container pt-5" style={{ marginBottom: "500px" }}>
        <h1 className="display-4">Configure Profile Settings</h1>
        {/* <p className="lead pt-2">
          Looks like your profile is empty, create one <Link to="/">here</Link>
        </p>
        <p className="lead pt-2">
          View all posts <Link to="/post">here</Link>
        </p>
        <p className="lead pt-2">
          Create a post <Link to="/create">here</Link>
        </p> */}

        <form className="pt-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="profilePic">Profile picture URL</label>
            <input
              type="text"
              className="form-control"
              id="profilePic"
              name="profilePic"
              value={profilePic}
              onChange={this.onChange}
              placeholder="Enter image address"
            />
          </div>

          <div className="form-group">
            <label for="bgPic">Background picture URL</label>
            <input
              type="text"
              className="form-control"
              id="bgPic"
              name="bgPic"
              value={bgPic}
              onChange={this.onChange}
              placeholder="Enter image address"
            />
          </div>

          <div className="form-group">
            <label for="bioInfo">Tell us about yourself</label>
            <textarea
              className="form-control"
              id="bioInfo"
              rows="4"
              placeholder="Enter as much as you would like . . ."
              name="bioInfo"
              value={bioInfo}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mt-2 mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="instagram">
                <i class="fab fa-instagram" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Instagram Handle"
              aria-label="Instagram"
              aria-describedby="instagram"
              name="instagram"
              value={instagram}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="linkedin">
                <i class="fab fa-linkedin" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Linkedin Handle"
              aria-label="Linkedin"
              aria-describedby="linkedin"
              name="linkedin"
              value={linkedin}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="github">
                <i class="fab fa-github" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Github Handle"
              aria-label="Github"
              aria-describedby="github"
              name="github"
              value={github}
              onChange={this.onChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="facebook">
                <i class="fab fa-facebook-square" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Facebook Handle"
              aria-label="Facebook"
              aria-describedby="facebook"
              name="facebook"
              value={facebook}
              onChange={this.onChange}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-block btn-lg btn-primary"
          />
        </form>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  submitProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { submitProfile }
)(Dashboard);