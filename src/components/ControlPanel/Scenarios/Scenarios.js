import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Scenarios = (props) => {
  const { scenarios } = props;
  const [category, setCategory] = useState();
  const [scenario, setScenario] = useState('');
  const [active, setActive] = useState();

  const handleSubmit = event => {
    event.preventDefault();

    console.log(category);
    console.log(scenario);
    console.log(active);
  }

  const onCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const onScenarioChange = (event) => {
    setScenario(event.target.value);
  }

  const onActiveChange = (event) => {
    setActive(event.target.value);
  }

  console.log(scenarios);


  return (
    <Container fluid >
      <Row className="justify-content-md-center">
        <Col lg="12">
          <h1>Scenarios</h1>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={(event) => onCategoryChange(event)}>
                <option value="1">Smell</option>
                <option value="2">Taste</option>
                <option value="3">Sight</option>
                <option value="4">Hearing</option>
                <option value="5">Tact</option>
                <option value="6">Mental</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} maxLength={50} onChange={(event) => onScenarioChange(event)} />
            </Form.Group>

            <Form.Check
              type="switch"
              id="custom-switch"
              label="Set as active"
              onChange={(event) => onActiveChange(event)}
            />

            <Button variant="primary" type="submit" onSubmit={() => handleSubmit()}>
              Submit
            </Button>
          </Form>


        </Col>
      </Row>
      <div>
        {scenarios.map(scenario => (
          <div key={scenario.description}>
            <div >{scenario.description}</div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Scenarios;
