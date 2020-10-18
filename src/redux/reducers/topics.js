
const initialState = {
    cards: [],
    currentTopic: {},
    currentPost: {},
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'TOPICS:SET_DATA':
            return {
                ...state,
                cards: [...payload]
            };
        case 'TOPICS:SET_CURRENT_TOPIC_DATA':
            return {
                ...state,
                currentTopic: payload
            };
        case 'TOPICS:SET_CURRENT_POST_DATA':
            return {
                ...state,
                currentPost: payload
            };
        default:
            return state
    }
}