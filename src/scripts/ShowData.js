import React from 'react';
import utilClasses from '../styles/Utils.module.css';

export default class ShowDataEntries extends React.Component {
    state = {
        loading: true,
        entries: null
    }

    async componentDidMount() {
        const url = "https://dry-bayou-99944.herokuapp.com/profiles";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ entries: data, loading: false })
    }

    render() {
        return (
            this.state.loading || !this.state.entries ?
                <div>Loading...</div> :
                this.state.entries.map((item, pos) => {
                    if (!item.name || !item.contact || !item.email || !item.address)
                        return false;
                    else
                        return (
                            <div key={pos} className={[utilClasses.colFlex].join(" ")}>
                                <p><span>{item.name}</span><span>{item.contact}</span></p>
                                <p>{item.email}</p>
                                <p>{item.address}</p>
                            </div>
                        )
                })
        )
    }
}