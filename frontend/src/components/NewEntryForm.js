import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

const API_URL = process.env.REACT_APP_API_URL

export default class NewEntryForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            definition: '',
            archived: false
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API_URL}dictionary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(this.props.refresh)
            .then(() => this.setState({
                name: '',
                definition: '',
                archived: false
            }))

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='input-form'>
                {'>'}<input name='name'
                    value={this.state.name}
                    type='text'
                    placeholder='Input Word or Phrase'
                    onChange={this.handleChange}
                    required
                />

                {' >'}<input name='definition'
                    value={this.state.definition}
                    type='text'
                    placeholder='Input Definition'
                    onChange={this.handleChange}
                    required
                />

                {' '}<Button variant="outline-success" onClick={this.handleSubmit}>
                    Post Entry
                </Button>
            </form>
        )
    }
}