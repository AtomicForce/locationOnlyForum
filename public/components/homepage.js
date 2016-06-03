import React from 'react';
import REST from '../services/REST';


export default class Homepage extends React.Component {
    constructor() {
        super();

        this.state = {};

        REST.get('/api/threads?lat=' + localStorage.getItem('lat') + '&lon=' + localStorage.getItem('lon')).then((data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <div>
                Threads...
            </div>
        );
    }
}
