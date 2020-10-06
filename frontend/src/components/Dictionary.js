import React, {Component} from 'react'

const API_URL = process.env.REACT_APP_API_URL

export default class extends Component {
    
    state = {entries: []}

    refresh = () => {
        fetch(`${API_URL}dictionary`)
        .then(response => response.json())
        .then(entries => this.setState({entries}))
    }

    componentDidMount(){
        this.refresh()
    }
    render () {
        
        const displayEntries = this.state.entries.map(entry => 
        <p key={entry._id}>{entry.name}: {entry.definition}</p>)
    
        return (
            <div>
                <h1>Coding Dictionary</h1>
                {displayEntries}
            </div>
        )
    }
}