
const initialState = {
    cards: [],
    currentTopic: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'TOPICS:SET_DATA':
            return {
                ...state,
                cards: [...payload]
            };
        default:
            return state
    }
}