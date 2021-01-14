
const initialState = {
    filter: '',
    sort: 'hot'
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FILTER:SET_FILTER':
            return {
                ...state,
                filter: payload
            };
        case 'FILTER:SET_SORT':
            return {
                ...state,
                sort: payload
            };
        default:
            return state
    }
}