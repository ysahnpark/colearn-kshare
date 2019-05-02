import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import eventReducer from './event/reducer'
import realmReducer from './realm/reducer'
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  realmReducer,
  eventReducer
})


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // The following line will make non-Chrome browser to throw error
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

// store.dispatch(loadEventsAsync());  --> refactored to EventList.js

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
