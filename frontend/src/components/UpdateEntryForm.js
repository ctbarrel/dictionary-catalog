import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

const API_URL = process.env.REACT_APP_API_URL

export default class UpdateEntryForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.entry.name,
            definition: props.entry.definition,
            archived: props.entry.archived
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API_URL}dictionary/${this.props.entry._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(this.props.refresh)

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='input-form'>
                {'>'}<input name='name'
                    value={this.state.name}
                    type='text'
                    placeholder='Input New Word or Phrase'
                    onChange={this.handleChange}
                    required
                />

                {' >'}<input name='definition'
                    value={this.state.definition}
                    type='text'
                    placeholder='Input New Definition'
                    onChange={this.handleChange}
                    required
                />

                {' '}<Button variant="outline-success" onClick={this.handleSubmit}>
                    Update Entry
                </Button>
            </form>
        )
    }
}