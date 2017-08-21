import initialState from './initialState';

export const authenticate = (state = initialState.authenticate, action) => {
    switch (action.type) {
        case 'Authenticate_login':
            return { ...state, loggedIn: action.data}
        case 'LOGGEDIN_USER_DATA':
            return { ...state, loggedIn_userData: action.data}
        default:
            return state
    }
}