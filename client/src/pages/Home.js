import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, Navbar, Nav, Form, FormControl, Button, Container, Pagination } from 'react-bootstrap'

export default function Home() {
    const auth = localStorage.getItem('access_token')
    const [jobs, setJobs] = useState([])
    const [jobsByLocation, setJobsByLocation] = useState([])
    const [keyword, setKeyword] = useState('')
    const [isClicked, setIsClicked] = useState('')


    function getById(id) {
        axios({
            url: 'http://localhost:3004/jobs/'+id
        })
        .then(({ data }) => {
            setIsClicked(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getJobs() {
        axios({
            url: 'http://localhost:3004/jobs',
            method: 'get'
        })
        .then(({ data }) => {
            setJobs(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getJobs()
    }, [])

    function formSearchSubmit(event) {
        event.preventDefault()
        axios({
            url: 'http://localhost:3004/jobs/location?q='+keyword,
            method: 'get'
        })
        .then(({ data }) => {
            setJobs(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if (!auth) {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        )
    }

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    return(
        <div>
            <Navbar bg="light" expand="lg" className="mb-5">
           <Link to="/"> <Navbar.Brand>Github Job</Navbar.Brand></Link>  
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/"><Button variant="link" onClick={e => getJobs(e)}>Home</Button></Link>
              </Nav>
              
              <Form onSubmit={formSearchSubmit} inline>
                <FormControl 
                type="text" 
                placeholder="Location" 
                className="mr-sm-2" 
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
            <Container>
            <select>
            { jobs.map((job) => (
                            <option 
                            key={job.id} 
                            job={job}
                            onClick={ () => getById(job.id) }
                            > {job.title} </option>
                        )) }
                  
              </select>
                <h1 className="text-center">Job List</h1>
                
                {/* <Table size="sm">
                    <thead>
                    </thead>
                    <tbody>
                        { jobs.map((job) => (
                            <tr key={job.id} job={job} >
                                <td>
                                    <h3> {job.title} </h3>
                                    <h6> {job.company} / {job.type}, { job.location} </h6>
                                </td>
                                <td>
                                    <Link to={`/detail/${job.id}`}> Detail </Link> 
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </Table> */}
                <Pagination size="sm">{items}</Pagination>
            </Container>
        </div>
    )
}