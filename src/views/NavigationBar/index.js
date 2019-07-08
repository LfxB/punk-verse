import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import BeerSearch from './../BeerSearch';

class NavigationBar extends React.Component {
    /*
    Displays the navigation bar,
    which contains a link to the Browse button
    and the BeerSearch component.
    Return type: JSX Element
    */
    render() {
        const { pathname } = this.props;

        return (
            <Menu attached="top" tabular>
                <Menu.Item
                    as={Link}
                    to={'/browse'}
                    name="browse"
                    active={pathname === '/browse'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position="right">
                    <Menu.Item>
                        <BeerSearch {...this.props} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

/*
    Retrieves the route location pathname
    from the Redux store and passes it as a prop to the
    NavigationBar component.
    Params: state - object
    Return type: object
*/
const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname,
    };
};

export default connect(mapStateToProps)(NavigationBar);
