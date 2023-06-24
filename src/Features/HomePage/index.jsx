import React from 'react';
import { Redirect } from 'react-router-dom';

HomePage.propTypes = {

};

function HomePage(props) {

    return (
        <div>
            <Redirect to="/products" />
        </div>
    );
}

export default HomePage;