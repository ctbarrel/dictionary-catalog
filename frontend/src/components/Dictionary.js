import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import NewEntry from './NewEntry'
import UpdateEntry from './UpdateEntry'

const API_URL = process.env.REACT_APP_API_URL

export default class extends Component {

    state = { entries: [], archivist: 'false' }

    refresh = () => {
        fetch(`${API_URL}dictionary`)
            .then(response => response.json())
            .then(entries => this.setState({ entries }))
    }

    handleDelete = (entry) => {
        fetch(`${API_URL}dictionary/${entry._id}`, {
            method: 'DELETE'
        })
            .then(this.refresh)
    }

    handleViewAll = (event) => {
        event.preventDefault()
        this.setState({ archivist: 'all' })
        this.refresh()
    }
    handleViewArchived = (event) => {
        event.preventDefault()
        this.setState({ archivist: 'true' })
        this.refresh()
    }
    handleViewCurrent = (event) => {
        event.preventDefault()
        this.setState({ archivist: 'false' })
        this.refresh()
    }

    componentDidMount() {
        this.refresh()
    }

    render() {

        const displayEntries = this.state.entries.map(
            entry => {
                if (this.state.archivist === 'all' || this.state.archivist === entry.archived.toString())
                {
                    return(<div key={entry._id}>
                    <span>{`>${entry.name}: ${entry.definition}`} </span>
                    <UpdateEntry refresh={this.refresh} entry={entry} />
                    <Button variant='outline-success' onClick={this.handleDelete.bind(this, entry)}>x</Button>
                    </div>)
                }
            })

        return (
            <div>
                <h1>Coding Dictionary</h1>
                <NewEntry refresh={this.refresh} />
                <ButtonGroup aria-label="archiveView" className="archivist">
                    <Button variant="outline-success" onClick={this.handleViewAll}>All</Button>
                    <Button variant="outline-success" onClick={this.handleViewCurrent}>Current</Button>
                    <Button variant="outline-success" onClick={this.handleViewArchived}>Archived</Button>
                </ButtonGroup>
                {displayEntries}
            </div>
        )
    }
}