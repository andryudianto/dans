import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Table, Card } from 'react-bootstrap'

export default function Detail() {
    const { id } = useParams()
    const [job, setJob] = useState({})

    function createMarkup() {
        return {__html: job.description};
      }
    
    function createMarkupHowToApply() {
        return {__html: job.how_to_apply};
      }

    useEffect(() => {
        axios({
            url: 'http://localhost:3004/jobs/'+id
        })
        .then(({ data }) => {
            setJob(data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <Container>
            <Link to="/"> Back </Link>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>
                                <h6> { job.type } / {job.location} </h6>
                                <h2> {job.title} </h2>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div dangerouslySetInnerHTML={createMarkup()} /></td>
                            <td>
                            <Card style={{ width: '18rem' }}>
                                <Card.Header> {job.company} </Card.Header>
                                <Card.Img variant="top" src={job.company_logo} />
                                <Card.Text className="text-center"> <a href={job.company_url}>{job.company_url} </a> </Card.Text>
                                <Card.Body>
                                    <Card.Title> How To Apply </Card.Title>
                                    <Card.Text>
                                    <div dangerouslySetInnerHTML={createMarkupHowToApply()} />
                                    {  }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </td>
                        </tr>
                    </tbody>
                </Table>                
            </Container>
        </div>
    )
}