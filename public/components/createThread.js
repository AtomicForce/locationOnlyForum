import React from 'react';
import REST from '../services/REST';


export default class createThread extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.handleCreateThread = this.handleCreateThread.bind(this);
    }

    handleCreateThread() {
        console.log(this.refs.nickname.value);
        console.log(this.refs.threadTitle.value);
        console.log(this.refs.threadText.value);

        const _tmp = {
            nick: this.refs.nickname.value,
            threadTitle: this.refs.threadTitle.value,
            threadText: this.refs.threadText.value
        };

        REST.post('/api/createThread?lat=' + localStorage.getItem('lat') + '&lon=' + localStorage.getItem('lon'), _tmp).then((data) => {
            console.log(data);
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Nickname" ref='nickname' />
                <br/>
                <input type="text" placeholder="Thread title" ref='threadTitle' />
                <br/>
                <textarea placeholder="Description" ref='threadText'></textarea>
                <br/>
                <button onClick={this.handleCreateThread}>Create Thread</button>
            </div>
        );
    }
}
