/* Configue store */
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index');

        store.replaceReducer(nextRootReducer);
      });
    }
  }
  return store;
}
