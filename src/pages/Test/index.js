import React from 'react';

const Test = () => {

    const handleResponse = (data) => {
        console.log(data);
    }

    const handleError = (error) => {
        this.setState({ error });
    }

    return (
        <div>
            <div className="fb-share-button"
                data-href="https://vk.com/glebmoped">
                test
            </div>
        </div>
    );
}

export default Test;
