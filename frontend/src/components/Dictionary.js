import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import NewEntry from './NewEntry'

const API_URL = process.env.REACT_APP_API_URL

export default class extends Component {
    
    state = {entries: []}

    refresh = () => {
        fetch(`${API_URL}dictionary`)
        .then(response => response.json())
        .then(entries => this.setState({entries}))
    }

    handleDelete = (entry) => {
        fetch(`${API_URL}dictionary/${entry._id}`, {
            method: 'DELETE'
        })
        .then(this.refresh)
    }

    componentDidMount(){
        this.refresh()
    }
    
    render () {
        
        const displayEntries = this.state.entries.map(entry => 
            <div>
        <span key={entry._id}>{`>${entry.name}: ${entry.definition}`} </span>
        <Button variant='outline-success' onClick={this.handleDelete.bind(this, entry)}>x</Button>
        </div>)
    
        return (
            <div>
                <h1>Coding Dictionary</h1>
                <NewEntry refresh={this.refresh}/>
                {displayEntries}
            </div>
        )
    }
}