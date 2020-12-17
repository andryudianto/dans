import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    function formLoginSubmit(event){
        event.preventDefault()
        axios({
            url: 'http://localhost:3004/login',
            method: 'post',
            data: {
                email, password
            }
        })
        .then(({ data }) => {
            history.push('/')
            localStorage.setItem('access_token', data)
        })
        .catch(err => {
            Swal.fire('wrong email / password')
            console.log(err)
        })
    }

    return(
        <div>
            <h1 className="text-center">Login</h1>
            <Container>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <Form onSubmit={formLoginSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>                            
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>
        </div>
    )
}