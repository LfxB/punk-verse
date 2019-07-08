/*  
    Reducer.
    Returns an object which contains a new state based on the passed action type.
    Triggered upon calling the 'updateBeerSearch' action creator.
    Params: state - object
            action - object
    Return type: object
*/
const beerSearch = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH':
            return { ...action.data };
        default:
            return state;
    }
};

export default beerSearch;
