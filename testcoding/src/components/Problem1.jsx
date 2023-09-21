import React, { useState } from 'react';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';

const Problem1 = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const [data, setData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, { name, status }]);
        setName('');
        setStatus('Active');
    };

    const handleFilter = (filterStatus) => {
        const sortedData = [...data].sort((a, b) => {
            if (a.status === 'Active') return -1;
            if (b.status === 'Active') return 1;
            if (a.status === 'Completed') return -1;
            if (b.status === 'Completed') return 1;
            return 0;
        });

        if (filterStatus === 'All') {
            return sortedData;
        }

        return sortedData.filter((item) => item.status === filterStatus);
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status:</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <div>
                        <Button
                            variant={status === 'Active' ? 'success' : 'outline-success'}
                            onClick={() => setStatus('Active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant={status === 'Completed' ? 'success' : 'outline-success'}
                            onClick={() => setStatus('Completed')}
                        >
                            Completed
                        </Button>
                        <Button
                            variant={status === 'All' ? 'success' : 'outline-success'}
                            onClick={() => setStatus('All')}
                        >
                            All
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handleFilter(status).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Problem1;
