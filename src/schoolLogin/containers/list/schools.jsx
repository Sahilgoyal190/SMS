import React, { Component } from 'react';
import firebase from 'firebase';
import {Link} from 'react-router';

import states from '../../constant/states.jsx'

class SchoolList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: []
        }
        this.getSchools = this.getSchools.bind(this);
        this.getSchools();
    }

    getSchools() {
        let self = this
        firebase.database().ref('/schools/').orderByChild('school_name').once('value', function (child) {
            let schoolObj = child.val();
            let schools = [];
            for (let keys in schoolObj) {
                schools.push(schoolObj[keys])
            }
            self.setState({ schools })
        })
    }

    getTime(UNIX_timestamp) {
        if(!UNIX_timestamp) return
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>School List</h1>
                <Link to={`/register/school`} className="btn btn-primary pull-right">Register School</Link>
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>School Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Address</th>
                            <th>Registeration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.schools.map((s, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <th>{s.school_name}</th>
                                        <th>{s.city}</th>
                                        <th>{s.state}</th>
                                        <th>{s.country}</th>
                                        <th>{s.address}</th>
                                        <th>{this.getTime(s.createdAt)}</th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SchoolList