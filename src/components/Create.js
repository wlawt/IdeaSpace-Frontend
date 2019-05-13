import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { postSubmit } from "../actions/PostAction";
import InputGroup from "./common/InputGroup";
import TextAreaGroup from "./common/TextAreaGroup";

import post from "../img/post.png";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      title: "",
      subTitle: "",
      body: "",
      imageURL: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const postData = {
      name: this.props.auth.fullname,
      title: this.state.title,
      subTitle: this.state.subTitle,
      body: this.state.body,
      imageURL: this.state.imageURL,
      accountId: this.props.auth.users
    };

    this.props.postSubmit(postData, this.props.history);
  };

  render() {
    const { title, subTitle, body, imageURL, errors } = this.state;

    return (
      <div className="container pb-5">
        <div className="row">
          <div className="col-6">
            <h1 className="display-4 pt-5 pb-4">Create a new post</h1>

            <form onSubmit={this.onSubmit} className="w-full max-w-md">
              {/*               <div className="flex items-center border-b border-b-2 border-teal py-2 mb-4">
                <input
                  className="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter author alias"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
              </div> */}

              <div className="flex flex-wrap -mx-3 mb-6">
                <InputGroup
                  divClassName="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-title"
                  labelTitle="Article Title"
                  inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-title"
                  type="text"
                  placeholder="Enter title here ..."
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <InputGroup
                  divClassName="w-full md:w-1/2 px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-subTitle"
                  labelTitle="Article Caption"
                  inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="grid-subTitle"
                  type="text"
                  placeholder="Enter sub-title ..."
                  name="subTitle"
                  value={subTitle}
                  onChange={this.onChange}
                  error={errors.subTitle}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <TextAreaGroup
                  divClassName="w-full px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-body"
                  labelTitle="Article Body"
                  textAreaClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="grid-body"
                  type="text"
                  placeholder="Enter article body ..."
                  rows="10"
                  name="body"
                  value={body}
                  onChange={this.onChange}
                  error={errors.body}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <InputGroup
                  divClassName="w-full px-3"
                  labelClassName="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  forAttr="grid-image"
                  labelTitle="Image"
                  inputClassName="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                  id="grid-image"
                  type="text"
                  placeholder="Enter image URL ..."
                  name="imageURL"
                  value={imageURL}
                  onChange={this.onChange}
                  error={errors.imageURL}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary btn-block btn-lg mt-4"
              >
                Create Post
              </button>
            </form>
          </div>

          <div className="col-6 my-auto pt-5 pl-5">
            <img src={post} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  postSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { postSubmit }
)(withRouter(Create));