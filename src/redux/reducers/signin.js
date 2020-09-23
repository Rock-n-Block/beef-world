
const initialState = {
    isOpen: true
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SIGNIN:TOGGLE':
            return {
                ...state,
                isOpen: payload
            };
        default:
            return state
    }
}