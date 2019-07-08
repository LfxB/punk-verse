/*  
    Reducer.
    Returns an object which contains a new state based on the passed action type.
    Triggered upon calling the 'addToHistory' action creator.
    Adds the passed beer item in action.data to the existing itemHistory array if it doesn't exist.
    Params: state - array
            action - object
    Return type: object
*/
const itemHistory = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_HISTORY':
            return state.some((item) => item.id === action.data.id)
                ? state
                : state.concat([{ ...action.data }]);
        default:
            return state;
    }
};

export default itemHistory;
