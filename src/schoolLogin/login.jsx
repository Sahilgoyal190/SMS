import React, { Component } from 'react';
import firebase from 'firebase';
// Redux Connect with Actions
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authenticateAction from './actions/authenticate';
import { validateEmail } from './lib/util.js'
// var style = require('../scss/login.scss');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    authenticate() {
        let username = this.refs.username.value
        if (validateEmail(username)) {
            this.props.authenticateAction.authenticateUser(username,this.refs.password.value)
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" ref="username" />
                <label htmlFor="pass">Password</label>
                <input type="password" id="pass" ref="password" />
                <button onClick={this.authenticate.bind(this)}>Submit</button>
                {this.state.error ? this.state.error : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
    activityDashBoard: state.activityDashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateAction: bindActionCreators(authenticateAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);