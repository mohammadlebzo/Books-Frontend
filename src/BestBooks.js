import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import Card from 'react-bootstrap/Card'
import { CardGroup } from 'react-bootstrap';

import axios from 'axios';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount = async () => {
    // console.log('inside componentDidMount')
    let url = `${process.env.REACT_APP_SERVER}/books`;
    let booksData = await axios.get(url)
    this.setState({
      books: booksData.data
    })
    console.log('Book Data', this.state.books)
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.books && <CardGroup>
          {this.state.books.map(item => {
            return (
              <Card>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{item.status}</Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </CardGroup>}
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;

{/* <Card.Img variant="top" src="holder.js/100px160" />  */ }