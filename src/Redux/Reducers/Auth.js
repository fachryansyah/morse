const initialState = {
    isAuthenticate: false,
    user: {
        fullname: '',
        email: '',
        apiKey: '',
        avatar: ''
    }
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: state.user
            }
        case 'AUTHENTICATED':
            return {
                ...state,
                isAuthenticate: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                isAuthenticate: false,
                user: {
                    fullname: '',
                    email: '',
                    apiKey: '',
                    avatar: ''
                }
            }
        default:
            return state
    }
}

export default auth