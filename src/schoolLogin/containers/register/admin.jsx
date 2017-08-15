import React, { Component } from 'react';
import firebase from 'firebase';
// Redux Connect with Actions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticateAction from '../../actions/authenticate';
import { validateEmail, validatePassword } from '../../lib/util.js'
// var style = require('../scss/login.scss');


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameError: null,
            lastNameError: null,
            emaiError: null,
            passwordError: null,
        }
        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
    }

   
    
    validate(){
        let firstname = this.refs.firstname.value;
        let lastname = this.refs.lastname.value;
        let email = this.refs.email.value;
        let password = this.refs.pwd.value;
        let repassword = this.refs.rpwd.value;

        firstname=='' &&  (this.state.firstNameError = 'First Name can not be blank');
        lastname=='' &&  (this.state.lastNameError = 'Last Name can not be blank');
        if(email=='') this.state.emaiError = 'Email can not be blank';
        else if(!validateEmail(email)) this.state.emaiError = 'Please Enter a valid Email Address'
        if(password=='') this.state.emaiError = 'Password can not be blank';
        else if(!validatePassword(password)) this.state.passwordError = 'Password must have 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character'
        

    }

    submit(){
        let err = this.validate();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Admin</h1>
                <form className="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4  col-sm-8 col-sm-offset-2 col-xs-12">
                    <div className="form-group">
                        <label for="fname">Firstname:</label>
                        <input type="text" className="form-control" ref="fname" />
                    </div>
                    <div className="form-group">
                        <label for="lname">Lastname:</label>
                        <input type="text" className="form-control" ref="lname" />
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="email" className="form-control" ref="email" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>  
                        <input type="password" className="form-control" ref="pwd" />
                    </div>
                    <div className="form-group">
                        <label for="rpwd">Confirm Password:</label>
                        <input type="password" className="form-control" ref="rpwd" />
                    </div>
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.submit}>Register Admin</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);