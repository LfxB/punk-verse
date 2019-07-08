import React from 'react';
import { connect } from 'react-redux';
import { Segment, Pagination, Divider, Message } from 'semantic-ui-react';
import queryString from 'query-string';
import loading from './../../assets/loading.svg';
import BeerItems from '../../components/BeerItems.js';

class Browse extends React.Component {
    constructor(props) {
        super(props);

        const { location } = this.props;

        this.state = {
            items: [],
            shouldFetch: true,
            displayError: false,
            totalPages: 2,
            prevSearchQuery: location.search,
        };
    }

    /*
    Fetches an array of beer data from Punk API based on the current query (if applicable)
    and page, as well as the next page, and saves it to the component's state.
    */
    updatePageItems = () => {
        const { shouldFetch, prevSearchQuery } = this.state;
        const { /*history,*/ location } = this.props;
        if (!shouldFetch && prevSearchQuery === location.search) return;

        console.log('Fetching page ', location.search);

        if (location.search === '') location.search = '?page=1';

        const parsedSearch = queryString.parse(location.search);
        let page = parsedSearch.page;

        const url = (page) => {
            const search = { ...parsedSearch };
            search.page = page;
            return (
                'https://api.punkapi.com/v2/beers?' + queryString.stringify(search) + '&per_page=30'
            );
        };

        fetch(url(page))
            .then((response) => {
                return response.text();
            })
            .then((responseBody) => {
                let items = JSON.parse(responseBody);

                if (items.length === 0) {
                    // location.search = '?page=1';
                    // history.push('/browse?page=1');
                    this.setState({
                        shouldFetch: false,
                        displayError: true,
                    });
                    return;
                }

                // fetch the next page, see if there are more items
                fetch(url(parseInt(page) + 1))
                    .then((responseNext) => {
                        return responseNext.text();
                    })
                    .then((responseBodyNext) => {
                        let nextItems = JSON.parse(responseBodyNext);

                        console.log('Next items: ', nextItems);
                        this.setState({
                            items,
                            shouldFetch: false,
                            displayError: false,
                            totalPages: nextItems.length === 0 ? page : page + 1,
                            prevSearchQuery: location.search,
                        });
                    });
            });
    };

    /*
    Initiates a call to 'updatePageItems'
    after the component mounts.
    */
    componentDidMount = () => {
        this.updatePageItems();
    };

    /*
    Initiates a call to 'updatePageItems'
    after the component updates.
    */
    componentDidUpdate = () => {
        this.updatePageItems();
    };

    /*
    Returns an object which contains the action type
    and the beer item data.
    Params: data - object
    Return type: object
    */
    handlePaginationChange = (e, { activePage }) => {
        const { history, location } = this.props;

        const parsed = queryString.parse(location.search);
        const stringified = queryString.stringify({ ...parsed, page: activePage });

        location.search = stringified;
        history.push('/browse?' + stringified);

        this.setState({
            shouldFetch: true,
            displayError: false,
        });
    };

    displayError = () => {
        const { displayError } = this.state;

        if (!displayError) return null;

        return (
            <Message warning>
                <Message.Header>No items matched your search term(s).</Message.Header>
                <p>Please try another search.</p>
            </Message>
        )
    }

    render = () => {
        const { items, totalPages, displayError } = this.state;
        const { location } = this.props;

        const parsed = queryString.parse(location.search);

        if (items.length === 0 && !displayError) {
            return (
                <img
                    alt={'Loading...'}
                    style={{
                        display: 'block',
                        margin: 'auto',
                    }}
                    src={loading}
                />
            );
        }

        return (
            <Segment attached>
                {this.displayError()}
                <BeerItems items={items} dispatch={this.props.dispatch} />
                <Divider />
                <Pagination
                    boundaryRange={0}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    activePage={parsed.page}
                    // defaultActivePage={parsed.page}
                    totalPages={totalPages}
                    onPageChange={this.handlePaginationChange}
                />
            </Segment>
        );
    };
}

export default connect()(Browse);
