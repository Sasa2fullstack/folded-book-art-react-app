import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import configureStore, { history } from 'store/configure';
import TopNav from 'containers/TopNav';
import Home from 'containers/Home';
import PatternList from 'containers/PatternList';
import PatternType from 'containers/PatternType';
import HowMany from 'containers/HowMany';
import SelectSilhouette from 'containers/SelectSilhouette';
import SilhouetteLibrary from 'containers/SilhouetteLibrary';
import Page404 from 'containers/Page404';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <TopNav />
          <main>
            <div className="container-fluid">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/pattern-list" exact component={PatternList} />
                <Route path="/pattern-type" exact component={PatternType} />
                <Route path="/choose-how-many" exact component={HowMany} />
                <Route path="/select-silhouette" exact component={SelectSilhouette} />
                <Route path="/silhouette-library" exact component={SilhouetteLibrary} />

                <Route component={Page404} />
              </Switch>
            </div>
          </main>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
