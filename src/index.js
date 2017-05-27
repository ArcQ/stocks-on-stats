import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import once from 'lodash/once';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createStore from './store/createStore';
import AppContainer from './containers/app-container';
import Routes from './routes';

const tapInitOnce = once(() => injectTapEventPlugin());
tapInitOnce();

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = Routes(store);
  ReactDOM.render(
    <MuiThemeProvider>
      <AppContainer store={store} routes={routes} />
    </MuiThemeProvider>
    ,
    MOUNT_NODE,
  );
};

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default; // eslint-disable-line global-require

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      }),
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
