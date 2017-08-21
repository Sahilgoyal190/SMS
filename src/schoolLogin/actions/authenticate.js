import firebase from 'firebase'

export const authenticateUser = (username,password,location) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(username, password).then((r) => {
            firebase.database().ref("/users/" + r.uid)
                .ref.once('value')
                .then(snapshot => {
                    console.log(snapshot.val())
                    dispatch({type:'Authenticate_login',data: true})
                    dispatch({type:'LOGGEDIN_USER_DATA',data: snapshot.val()})
                    location ? window.location.assign(location) :window.location.assign('/#/home');
                }).catch(err => console.log(err))
        })
    }
}