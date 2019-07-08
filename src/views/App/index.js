import React from 'react';

import { Container } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import NavigationBar from 'views/NavigationBar';
import Browse from 'views/Browse';
import BeerDetails from 'views/BeerDetails';

/*
    Displays React components, some depending on the current route.
    Return type: JSX.Element
*/
export default class App extends React.Component {
    render() {
        return (
            <div
                style={{
                    backgroundColor: '#FEFEFE',
                    minHeight: '100vh',
                    paddingTop: '100px',
                }}
            >
                <Container>
                    <Header />
                    <Route path={'/'} render={(props) => <NavigationBar {...props} />} />
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to="/browse" />} />
                        <Route path={'/browse'} render={(props) => <Browse {...props} />} />
                        <Route
                            exact
                            path={'/beer/:id'}
                            render={(props) => <BeerDetails {...props} />}
                        />
                    </Switch>
                </Container>
            </div>
        );
    }
}
