
const INITIAL_STATE = [];



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_CALC':
            return [action.payload, ...state]
        default:
            return state;
    }
};