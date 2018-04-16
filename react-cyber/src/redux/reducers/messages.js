const initialState = [];

const messages = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
                ...state,
                action.payload.message,
            ]
        default:
            return state;
    }
}

export default messages;