import React, { Component } from 'react';
import firebase from 'firebase';
import states from '../../constant/states.jsx';
import vocab from '../../constant/vocab.jsx';


// Redux Connect with Actions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticateAction from '../../actions/authenticate';
import { validateEmail } from '../../lib/util.js'

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            states: states,
            success: false,
        }
        this.submit = this.submit.bind(this);
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

    render() {
        console.log(this.props.userData)
        return (
            <div className="container-fluid">
                <h1>School</h1>
                {this.state.success && <div className="alert alert-success">{`School ${vocab.sucess}`}</div>}
                <form className="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4  col-sm-8 col-sm-offset-2 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="sname">School Name:</label>
                        <input type="text" className="form-control" ref="sname" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea className="form-control" name="address" ref="address" rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" ref="city" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">ZIP/PIN:</label>
                        <input type="number" className="form-control" ref="zip" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <select className="form-control" name="state" ref="state">
                            {
                                this.state.states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input type="text" className="form-control" ref="country" value="India" disabled={true} />
                    </div>
                    {this.state.error && <div className="alert alert-danger">Please fill all fields carefully</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

// export default MyProfile
