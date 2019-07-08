import React from 'react';
import { connect } from 'react-redux';
import {
    Icon,
    Grid,
    Header,
    Segment,
    Card,
    Image,
    Label,
    List,
    Divider,
    Table,
} from 'semantic-ui-react';
import loading from './../../assets/loading.svg';
import { addToHistory } from './../../actions';
import { capitalizeEachWord } from './../../Helpers/stringhelper.js';

class BeerDetails extends React.Component {
    /*
    Initializes props and saves the last item in the
    itemHistory redux store inside this component's state object.
    Params: props - object
    */
    constructor(props) {
        super(props);

        const { itemHistory } = this.props;
        const lastItem = itemHistory[itemHistory.length - 1];

        this.state = {
            item: lastItem,
        };
    }

    /*
    Fetches the beer details for a specific item via Punk API
    if there isn't any item data in the component state or the item id
    doesn't match the wildcard value in the address bar.
    */
    componentDidMount = () => {
        console.log('BeerDetails component mounted.');

        const { itemHistory, match } = this.props;
        const item = itemHistory[itemHistory.length - 1];

        if (itemHistory.length !== 0 && item.id === parseInt(match.params.id)) return;

        console.log('BeerDetails fetch required on id: ', match.params.id);
        // Seems to return Error 522 on ids other than 1...
        fetch('https://api.punkapi.com/v2/beers/' + match.params.id)
            .then((response) => {
                return response.text();
            })
            .then((responseBody) => {
                let items = JSON.parse(responseBody);

                console.log('items', items);
                this.setState({
                    item: items[0],
                });
            });
    };

    /*
    Adds this beer item data to the itemHistory array in the Redux store
    before the component unmounts.
    */
    componentWillUnmount = () => {
        const { item } = this.state;

        if (item !== undefined) {
            this.props.dispatch(addToHistory(item));
        }
    };

    /*
    Loops through all the keys in the item data object
    which return a number (except for 'id') and returns them
    as a group of Table.Row JSX elements.
    Params: item - object
    Return type: array of JSX Elements
    */
    getTableDetails = (item) => {
        let details = [];

        const keys = Object.keys(item);

        keys.forEach((key) => {
            let keyVal = item[key];

            if (typeof keyVal === 'number') {
                if (key === 'id') return;

                details.push(
                    <Table.Row>
                        <Table.Cell>{capitalizeEachWord(key.replace('_', ' '))}</Table.Cell>
                        <Table.Cell>{keyVal}</Table.Cell>
                    </Table.Row>
                );
            }
        });

        return details;
    };

    /*
    Loops through all the ingredients in the beer object
    and returns them as separate lists within a single object.
    Params: item - object
    Return type: object
    */
    getIngredients = (item) => {
        let ingredients = {};

        ingredients.malt = item.ingredients.malt.map((i) => {
            return (
                <List.Item>
                    <List.Header>{i.name}</List.Header>
                    {i.amount.value + ' ' + i.amount.unit}
                </List.Item>
            );
        });

        ingredients.hops = item.ingredients.hops.map((i) => {
            return (
                <List.Item>
                    <List.Header>{i.name}</List.Header>
                    <List.Content>
                        <List.Description>{i.amount.value + ' ' + i.amount.unit}</List.Description>
                        <List.Description>{'Add: ' + i.add}</List.Description>
                        <List.Description>{'Attribute: ' + i.attribute}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });

        ingredients.yeast = item.ingredients.yeast;

        return ingredients;
    };

    /*
    Displays all beer details (except method) on a single card.
    Return type: JSX Element
    */
    render() {
        const { item } = this.state;

        if (item === undefined) {
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

        const tableDetails = this.getTableDetails(item);
        const ingredients = this.getIngredients(item);

        return (
            <Segment attached>
                <Card fluid>
                    <Image src={item['image_url']} wrapped ui={true} size="small" centered />
                    <Card.Content>
                        <Card.Header>{item.name}</Card.Header>
                        <Card.Meta>{item.tagline}</Card.Meta>
                        <Card.Description>{item.description}</Card.Description>
                        <Divider hidden />
                        <Label basic>
                            First Brewed
                            <Label.Detail>{item['first_brewed']}</Label.Detail>
                        </Label>
                        <Divider hidden />
                        <Grid columns="equal">
                            <Grid.Column>
                                <Header>
                                    <Icon name="food" />
                                    Food Pairings
                                </Header>
                                <List>
                                    {item['food_pairing'].map((i) => {
                                        return (
                                            <List.Item>
                                                <List.Icon name="angle right" />
                                                <List.Content>{i}</List.Content>
                                            </List.Item>
                                        );
                                    })}
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header>
                                    <Icon name="comment outline" />
                                    Brewers Tips
                                </Header>
                                <Card.Description>{item['brewers_tips']}</Card.Description>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                    <Card.Content>
                        <Grid columns="equal">
                            <Grid.Column>
                                <Header>
                                    <Icon name="list alternate outline" />
                                    Details
                                </Header>
                                <Table definition collapsing>
                                    <Table.Body>
                                        {tableDetails}
                                        <Table.Row>
                                            <Table.Cell>Volume</Table.Cell>
                                            <Table.Cell>
                                                {item.volume.value + ' ' + item.volume.unit}
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Boil Volume</Table.Cell>
                                            <Table.Cell>
                                                {item['boil_volume'].value +
                                                    ' ' +
                                                    item['boil_volume'].unit}
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                            <Grid.Column>
                                <Header>
                                    <Icon name="shopping basket" />
                                    Ingredients
                                </Header>
                                <Table definition collapsing>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Malt</Table.Cell>
                                            <Table.Cell>
                                                <List>{ingredients.malt}</List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Hops</Table.Cell>
                                            <Table.Cell>
                                                <List>{ingredients.hops}</List>
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Yeast</Table.Cell>
                                            <Table.Cell>
                                                <List>{ingredients.yeast}</List>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
            </Segment>
        );
    }
}

/*
    Gets the itemHistory from the Redux store and passes
    it as a prop to the BeerDetails component.
    Params: state - object
    Return type: object
*/
const mapStateToProps = (state) => {
    return {
        itemHistory: state.itemHistory,
    };
};

export default connect(mapStateToProps)(BeerDetails);
