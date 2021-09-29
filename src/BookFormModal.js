import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

class BookFormModal extends React.Component {
        

    submitBookInfo = async (e) => {
        e.preventDefault();
        const { user } = this.props.auth0;
        let book = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            email: user.email
        }
        let booksData = await axios.post(`${process.env.REACT_APP_SERVER}/books`, book);
        this.props.addBook(booksData.data);
        this.props.close();
    };
    render() {
        return (
            <>
                <Modal show={this.props.showModel} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitBookInfo.bind(this)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control type="text" placeholder="name" name="title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="description" name="description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" placeholder="status" name="status" />
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

export default withAuth0(BookFormModal);
