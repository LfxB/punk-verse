import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { addToHistory } from './../actions';
import { shortenStr } from './../Helpers/stringhelper.js';

/*
    Lists beer items as a group of Cards.
    Contains an image, title, tagline, and description.
    Each card is a clickable link which redirects to /item/:id.
    Params: props - object
    Return type: JSX.Element
*/
const BeerItems = (props) => {
    const { items, dispatch } = props;

    /*
    Stores the data of a clicked item to the redux store
    Params: item - object
    */
    const onClick = (item) => {
        dispatch(addToHistory(item));
    };

    return (
        <Card.Group itemsPerRow={3}>
            {items.map((item, key) => {
                return (
                    <Card
                        key={key}
                        color="brown"
                        as={Link}
                        to={'/beer/' + item.id}
                        onClick={() => onClick(item)}
                    >
                        <img
                            alt={''}
                            src={item['image_url']}
                            style={{
                                height: '200px',
                                width: 'inherit !important',
                                objectFit: 'contain',
                            }}
                        />
                        <Card.Content>
                            <Card.Header>{item.name}</Card.Header>
                            <Card.Meta>{item.tagline}</Card.Meta>
                            <Card.Description>{shortenStr(item.description, 100)}</Card.Description>
                        </Card.Content>
                    </Card>
                );
            })}
        </Card.Group>
    );
};

export default BeerItems;
