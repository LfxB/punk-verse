import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import itemHistory from './reducers/history.js';
import beerSearch from './reducers/beerSearch.js';

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        itemHistory,
        beerSearch,
    });

const configureStore = (initialState = {}, history) => {
    // Middleware
    const middlewares = [routerMiddleware(history), thunk];

    // Add support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
};

export default configureStore;
