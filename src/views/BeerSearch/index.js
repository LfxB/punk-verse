import React from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import { updateBeerSearch } from './../../actions';
import { searchQueries, getSearchQueries } from './../../Helpers/searchHelper.js';
import queryString from 'query-string';

class BeerSearch extends React.Component {
    timeoutId = 0;

    /*
    Updates the Redux store with new search data
    when the search input changes.
    Params: e - object
            anonymous object -> value - string
    */
    handleSearchChange = (e, { value }) => {
        const { beerSearch } = this.props;
        this.props.dispatch(updateBeerSearch({ ...beerSearch, value }));
    };

    /*
    Updates the location.search and history props 500 milliseconds
    after 'handleSearchChange' is called and if the value has changed.
    Params: prevProps - object
    */
    componentDidUpdate = (prevProps) => {
        if (prevProps.beerSearch.value !== this.props.beerSearch.value) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                console.log('Search update: ', this.props.beerSearch.value);

                const { beerSearch, history, location } = this.props;
                console.log('search props', this.props);

                const searchQueries = queryString.stringify(getSearchQueries(beerSearch.value));

                this.props.dispatch(updateBeerSearch({ ...beerSearch, searchQueries }));

                history.push('/browse?' + searchQueries);
                location.search = searchQueries;
            }, 500);
        }
    };

    render() {
        const { value } = this.props.beerSearch;

        return (
            <Search
                results={searchQueries}
                value={value}
                onSearchChange={this.handleSearchChange}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        beerSearch: state.beerSearch,
    };
};

export default connect(mapStateToProps)(BeerSearch);
