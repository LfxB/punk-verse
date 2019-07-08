/*
    Capitalizes the first letter of each word in a string.
    Params: str - string
    Return type: string
*/
export const capitalizeEachWord = (str) => {
    return str
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

/*
    Shortens the string to a predetermined length and adds an ellipsis.
    Params: str - string
            charAmount - number
    Return type: string
*/
export const shortenStr = (str, charAmount) => {
    return str.length <= charAmount ? str : str.slice(0, charAmount - 3).trim() + ' . . .';
};
