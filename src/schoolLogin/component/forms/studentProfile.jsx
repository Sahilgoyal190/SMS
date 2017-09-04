import React, { Component } from 'react';
import firebase from 'firebase';

// Redux Connect with Actions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticateAction from '../../actions/authenticate';
import { validateEmail } from '../../lib/util.js';
import default_images from '../../constant/default_images.jsx'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNameError: null,
            lastNameError: null,
            emaiError: null,
            cepassworError: null,
            passwordError: null,
            success: false,
        }
        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate() {
        return new Promise((resolve, reject) => {
            const firstname = this.refs.fname.value;
            const lastname = this.refs.lname.value;
            const crpassword = this.refs.cpwd.value;
            const password = this.refs.pwd.value;
            const repassword = this.refs.rpwd.value;
            this.state.firstNameError = firstname == '' ? 'First Name can not be blank' : null;
            this.state.lastNameError = lastname == '' ? 'Last Name can not be blank' : null;

            if (crpassword == '') this.state.cepassworError = 'Current Password can not be blank';
            else if (!validatePassword(crpassword)) this.state.cepassworError = 'Password must have 1 Uppercase, 1 Lowercase and 1 Number'

            if (password == '') this.state.passwordError = 'Password can not be blank';
            else if (!validatePassword(password)) this.state.passwordError = 'Password must have 1 Uppercase, 1 Lowercase and 1 Number'
            else if (password != repassword) this.state.passwordError = 'confirm password does not match';
            else this.state.passwordError = null;

            this.forceUpdate();
            resolve();
        })
    }

    submit() {
        const email = this.props.userData.email;
        const password = this.refs.pwd.value;
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
            console.log('test');
        })
        // firebase.autn().updatePassword(password).then((result) => console.log(result))
        // this.validate().then(() => {
        //     if (!this.state.firstNameError && !this.state.lastNameError && !this.state.emaiError && !this.state.passwordError && !this.state.cepassworError) {
        //         const uid = this.props.userData.uid
        //         const firstname = this.refs.fname.value;
        //         const lastname = this.refs.lname.value;
        //         const crpassword = this.refs.cpwd.value;
        //         const password = this.refs.pwd.value;
        //         firebase.auth().updatePassword(password).then((result) => {
        //             if (uid) {
        //                 firebase.database().ref(`/users/${uid}`).set({
        //                     first_name: firstname,
        //                     last_name: lastname,                
        //                 }).then(()=>{
        //                     this.setState({success:true})
        //                 })
        //             } else {
        //                 this.setState({ passwordError: 'Something Went Wrong, User Didn\'t Created' })
        //             }
        //         }).catch((err)=>{
        //             this.setState({passwordError:err.message})
        //         })
        //     }

        // })
    }

    render() {
        let imageUrl = this.props.userData.imageUrl ? this.props.userData.imageUrl : default_images.dummy_male
        return (
            <div className="container-fluid">
                <h1>My Profile</h1>
                {this.state.success && <div className="alert alert-success">{`School ${vocab.sucess}`}</div>}
                <div className="col-md-2 col-lg-2 col-sm-4 col-xs-12">
                    <img className="img img-thumbnail" src={imageUrl} alt="" />
                    <button className="btn btn-primary btn-block" onClick={this.props.openModal}>Upload image</button>
                </div>
                <form className="col-md-4 col-lg-4 col-sm-8 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="fname">First Name:</label>
                        <input type="text" className="form-control" ref="fname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fname">Last Name:</label>
                        <input type="text" className="form-control" ref="lname" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Current Password:</label>
                        <input type="password" className="form-control" ref="cpwd" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" ref="pwd" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpwd">Confirm Password:</label>
                        <input type="password" className="form-control" ref="rpwd" />
                    </div>
                    <button type="button" className="btn btn-block btn-primary" onClick={this.submit}>Register School</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.authenticate.loggedIn_userData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authenticateAction: bindActionCreators(authenticateAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default MyProfile
