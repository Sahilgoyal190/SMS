import React, { Component } from 'react';
import firebase from 'firebase';
// Redux Connect with Actions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticateAction from '../../actions/authenticate';
import { validateEmail, validatePassword } from '../../lib/util.js';
import vocab from '../../constant/vocab.jsx';
import Roles from '../../constant/roles.jsx';

// var style = require('../scss/login.scss');


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameError: null,
            lastNameError: null,
            emaiError: null,
            passwordError: null,
            schools: []
        }
        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
        this.getSchools = this.getSchools.bind(this);
        this.getSchools();
    }

    getSchools() {
        let self = this
        firebase.database().ref('/schools/').orderByChild('school_name').once('value', function (child) {
            let schoolObj = child.val();
            let schools = [];
            for (let keys in schoolObj) {
                schoolObj[keys].id = keys;
                schools.push(schoolObj[keys])
            }
            self.setState({ schools })
        })
    }

    validate() {
        return new Promise((resolve, reject) => {
            const firstname = this.refs.fname.value;
            const lastname = this.refs.lname.value;
            const email = this.refs.email.value;
            const password = this.refs.pwd.value;
            const repassword = this.refs.rpwd.value;
            this.state.firstNameError = firstname == '' ? 'First Name can not be blank' : null;
            this.state.lastNameError = lastname == '' ? 'Last Name can not be blank' : null;
            if (email == '') this.state.emaiError = 'Email can not be blank';
            else if (!validateEmail(email)) this.state.emaiError = 'Please Enter a valid Email Address'
            else this.state.emaiError = null;
            if (password == '') this.state.passwordError = 'Password can not be blank';
            else if (!validatePassword(password)) this.state.passwordError = 'Password must have 1 Uppercase, 1 Lowercase and 1 Number'
            else if (password != repassword) this.state.passwordError = 'confirm password does not match';
            else this.state.passwordError = null;
            this.forceUpdate();
            resolve();
        })
    }

    submit() {
        this.validate().then(() => {
            if (!this.state.firstNameError && !this.state.lastNameError && !this.state.emaiError && !this.state.passwordError) {
                const firstname = this.refs.fname.value;
                const lastname = this.refs.lname.value;
                const email = this.refs.email.value;
                const password = this.refs.pwd.value;
                const school_id = this.refs.school.value;
                firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
                    if (result.uid) {
                        firebase.database().ref(`/users/${result.uid}`).set({
                            first_name: firstname,
                            last_name: lastname,
                            email,
                            school_id,
                            createdAt: Math.round((new Date()).getTime()),
                            role:Roles.admin
                        }).then(()=>{
                            this.setState({success:true})
                        })
                    } else {
                        this.setState({ passwordError: 'Something Went Wrong, User Didn\'t Created' })
                    }
                }).catch((err)=>{
                    this.setState({passwordError:err.message})
                })
            }

        })

    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Admin</h1>
                {this.state.success && <div className="alert alert-success">{`Admin ${vocab.sucess}`}</div>}
                <form className="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4  col-sm-8 col-sm-offset-2 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="fname">Firstname:</label>
                        <input type="text" className="form-control" ref="fname" />
                    </div>
                    {this.state.firstNameError && <div className="alert alert-danger">{this.state.firstNameError}</div>}
                    <div className="form-group">
                        <label htmlFor="lname">Lastname:</label>
                        <input type="text" className="form-control" ref="lname" />
                    </div>
                    {this.state.lastNameError && <div className="alert alert-danger">{this.state.lastNameError}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" ref="email" />
                    </div>
                    {this.state.emaiError && <div className="alert alert-danger">{this.state.emaiError}</div>}

                    <div className="form-group">
                        <label htmlFor="schools">School:</label>
                        <select className="form-control" name="schools" ref="school">
                            {this.state.schools.map(s => <option key={s.id} value={s.id}>{`${s.school_name} (${s.city} - ${s.zip})`}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" ref="pwd" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpwd">Confirm Password:</label>
                        <input type="password" className="form-control" ref="rpwd" />
                    </div>
                    {this.state.passwordError && <div className="alert alert-danger">{this.state.passwordError}</div>}
                    <button type="button" className="btn btn-block btn-primary" onClick={this.submit}>Register Admin</button>
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