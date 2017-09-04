import React, { Component } from 'react';
import firebase from 'firebase';
import states from '../../constant/states.jsx';
import vocab from '../../constant/vocab.jsx';

// Redux Connect with Actions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticateAction from '../../actions/authenticate';
import { validateEmail } from '../../lib/util.js'
import Profile from '../../component/forms/studentProfile.jsx';
import ImageUpload from '../../component/general/picUpload.jsx';
import Modal from '../../component/general/modal.jsx';



class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            states: states,
            success: false,
            showModal:false,
        }
        this.submit = this.submit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    submit() {
        const school_name = this.refs['sname'].value;
        const city = this.refs['city'].value;
        const zip = this.refs['zip'].value;
        const state = this.refs['state'].value;
        const country = this.refs['country'].value;
        const address = this.refs['address'].value;
        if (school_name == '' || city == '' || zip == '' || state == '' || country == '' || address == '') {
            this.setState({ error: true });
            return
        } else {
            this.setState({ error: false });
        }
        const now = Math.round((new Date()).getTime())
        firebase.database().ref('/schools/').push({
            school_name,
            city,
            zip,
            state,
            country,
            address,
            createdAt: now
        }).then(() => {
            this.setState({ success: true })
            this.refs['sname'].value = null;
            this.refs['city'].value = null;
            this.refs['zip'].value = null;
            this.refs['state'].value = null;
            this.refs['country'].value = null;
            this.refs['address'].value = null;
        })
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleUpload(url){
        this.setState({ imageUrl: url });
    }
    render() {
        console.log(this.props.userData)
        return (
            <div>
                <Modal content={<ImageUpload handleUpload={this.handleUpload} userData={this.props.userData}/>} showModal={this.state.showModal} handleCloseModal={this.handleCloseModal}/>
                <Profile openModal={this.handleOpenModal}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

// export default MyProfile
