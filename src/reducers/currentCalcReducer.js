export default (state = null, action) => {
    switch (action.type) {
        case 'FETCH_CALC':
            return action.payload
        default:
            return state;
    }
};