import React, { Component } from 'react';
import firebase from 'firebase';

import states from '../../constant/states.jsx'

class Schoool extends Component {
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
            ca:now
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
        return (
            <div className="container-fluid">
                <h1>School</h1>
                {this.state.success && <div className="alert alert-success">School has been Registered successfully</div>}
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

export default Schoool