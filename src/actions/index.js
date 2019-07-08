/*
    Action creator.
    Returns an object which contains the action type
    and the beer item data from Punk API.
    Params: data - object
    Return type: object
*/
export const addToHistory = (data) => ({
    type: 'ADD_ITEM_TO_HISTORY',
    data,
});

/*
    Action creator.
    Returns an object which contains the action type
    and data for the last search input (value : string, searchQueries : string)
    Params: data - object
    Return type: object
*/
export const updateBeerSearch = (data) => ({
    type: 'UPDATE_SEARCH',
    data,
});
