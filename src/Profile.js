import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        // const user = this.props.auth0.user;
        // const isAuthenticated = this.props.auth0.isAuthenticated;
        // console.log(user);
        return isAuthenticated && (
            <>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={user.picture} />
                    <Card.Body>
                        <Card.Text>username: {user.name}</Card.Text>
                        <Card.Text>email: {user.email}</Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default withAuth0(Profile);