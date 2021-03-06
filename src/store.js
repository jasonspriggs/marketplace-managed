import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
// import the root reducer and default state of the app
import rootReducer, { defaultState } from './reducers/index';


// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

// Redux Devtools extension
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(historyMiddleware, thunk),
);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  rootReducer,
  defaultState,
  enhancer,
  compose(
    autoRehydrate()
  )
);

export const persistor = persistStore(store, {whitelist: ['auth']});

export default store;
