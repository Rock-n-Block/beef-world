export default {
    setMainSort: data => ({
        type: 'FILTER:SET_SORT',
        payload: data
    }),
    setMainFilter: data => ({
        type: 'FILTER:SET_FILTER',
        payload: data
    })
}