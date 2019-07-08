export const searchQueries = [
    {
        title: 'Looking for something?',
        type: 'help',
        description:
            'You can use keywords! Try searching "weiss abv<5 ebc>7 malt:wheat food:chicken_wing".',
    },
    {
        title: 'abv',
        type: 'number',
        description:
            'Returns all beers with ABV greater or lesser than the specified number. Ex: abv<30',
    },
    {
        title: 'ibu',
        type: 'number',
        description:
            'Returns all beers with IBU greater or lesser than the specified number. Ex: ibu>15',
    },
    {
        title: 'ebc',
        type: 'number',
        description:
            'Returns all beers with EBC greater or lesser than the specified number. Ex: ebc<40',
    },
    {
        title: 'malt',
        type: 'text',
        description:
            'Returns all beers matching the specified malt name. Use an underscore for spaces. Ex: malt:maris_otter',
    },
    {
        title: 'yeast',
        type: 'text',
        description:
            'Returns all beers matching the specified yeast name. Use an underscore for spaces. Ex: yeast:wyeast_1272',
    },
    {
        title: 'hops',
        type: 'text',
        description:
            'Returns all beers matching the specified hops name. Use an underscore for spaces. Ex: hops:bramling_cross',
    },
    {
        title: 'food',
        type: 'text',
        description:
            'Returns all beers matching the specified food name. Use an underscore for spaces. Ex: food:tempura_prawns',
    },
];

/*
    Returns an object which contains the user-inputted search queries.
    Params: str - string
    Return type: object
*/
export const getSearchQueries = (str) => {
    let searched = str.toLowerCase();
    let beerName = [];
    let queries = {};
    let keyParams = [];

    searched.split(' ').forEach((s) => {
        if (s.includes('<')) {
            keyParams = s.split('<');

            if (keyParams[1] !== '' && !isNaN(keyParams[1]))
                queries[keyParams[0] + '_lt'] = keyParams[1];
        } else if (s.includes('>')) {
            keyParams = s.split('>');

            if (keyParams[1] !== '' && !isNaN(keyParams[1]))
                queries[keyParams[0] + '_gt'] = keyParams[1];
        } else if (s.includes(':')) {
            keyParams = s.split(':');

            if (keyParams[1] !== '') queries[keyParams[0]] = keyParams[1];
        } else {
            beerName.push(s);
        }
    });

    beerName = beerName.join(' ');
    if (beerName !== '') queries['beer_name'] = beerName;

    queries.page = 1;

    return queries;
};
