import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

class UpdateBookFormModel extends React.Component {
        

    UdateBookInfo = async (e) => {
        e.preventDefault();
        let book = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            email: this.props.bookData.email,
            _id: this.props.bookData._id
        }
        let newbookData = await axios.put(`${process.env.REACT_APP_SERVER}/updatebook`, book);
        this.props.updateBook(newbookData.data);
        this.props.close();
    };
    render() {
        return (
            <>
                <Modal show={this.props.showModel} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.UdateBookInfo.bind(this)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.bookData.title} name="title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.bookData.description} name="description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.bookData.status} name="status" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withAuth0(UpdateBookFormModel);
