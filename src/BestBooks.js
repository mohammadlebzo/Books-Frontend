import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Card from 'react-bootstrap/Card'
import { CardGroup } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
import UpdateBookFormModel from './UpdateBookFormModel';
import Button from 'react-bootstrap/Button'

import axios from 'axios';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModel: false,
      showModelUpdate: false,
      bookInfo: {}
    }
  }

  componentDidMount = async () => {
    let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/getbooks`);
    this.setState({
      books: booksData.data
    })
  }

  handleClose = () => {
    this.setState({ showModel: false });
  };
  handleCloseUpdate = () => {
    this.setState({ showModelUpdate: false });
  };

  handleShow = () => {
    this.setState({ showModel: true });
  };

  handleShowUpdate = (book) => {
    this.setState({ 
      showModelUpdate: true,
      bookInfo: book
    });
  };

  addBook = (info) => {
    this.setState({ books: info })
  };

  updateBook = (info) => {
    this.setState({ books: info })
  };

  deleteBook = async (bookID) => {
    // console.log(bookID);
    let delURL = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook?bookID=${bookID}`);
    this.setState({ books: delURL.data })
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <button onClick={this.handleShow}>AddBook</button>
        {this.state.showModel &&
          <BookFormModal
            showModel={this.state.showModel}
            close={this.handleClose}
            addBook={this.addBook.bind(this)}
          />
        }
        {this.state.books && <CardGroup>
          {this.state.books.map(item => {
            return (
              <>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.status}</Card.Text>
                    <Button variant="danger" onClick={() => { this.deleteBook(item._id) }}>Delete</Button>
                    <Button variant="secondary" onClick={() => {this.handleShowUpdate(item)}}>Update</Button>
                  </Card.Body>
                </Card>
                {this.state.showModelUpdate &&
                  <UpdateBookFormModel
                    showModel={this.state.showModelUpdate}
                    close={this.handleCloseUpdate}
                    updateBook={this.updateBook.bind(this)}
                    bookData={this.state.bookInfo}
                  />
                }
              </>
            )
          })}
        </CardGroup>}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);

{/* <Card.Img variant="top" src="holder.js/100px160" />  */ }