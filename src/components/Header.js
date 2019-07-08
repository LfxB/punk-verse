import React from 'react';

/*
    Displays the title at the top of all web pages.
*/
function Header(props) {
    return (
        <h1
            style={{
                textAlign: 'center',
                fontFamily: "'Monoton', cursive",
                fontSize: '40px',
                fontStyle: 'italic'
            }}
        >
            PUNKVERSE
        </h1>
    );
}

export default Header;
