import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider
          preventDuplicate
          maxSnack={3}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <Router history={history}>
            <Routes />
            <GlobalStyle />
          </Router>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
