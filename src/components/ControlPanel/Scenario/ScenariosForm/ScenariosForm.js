import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ScenariosForm = (props) => {
  const { scenario } = props;

  console.log(scenario); 

  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [active, setActive] = useState();

  useEffect(() => {
    if(scenario !== undefined){
      setCategory(scenario.category);
      setDescription(scenario.description);
      setActive(scenario.active);
    }
  }, [scenario]);


  const handleSubmit = event => {
    event.preventDefault();

    console.log(category);
    console.log(description);
    console.log(active);
  }

  const onCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const onScenarioChange = (event) => {
    setDescription(event.target.value);
  }

  const onActiveChange = (event) => {
    setActive(!active);
  }
  
  return(
    <Container fluid >
      <Row className="justify-content-md-center">
        <Col lg="12">
          <h1>Scenario</h1>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={(event) => onCategoryChange(event)} defaultValue={scenario.category}>
                <option value={1}>Smell</option>
                <option value={2}>Taste</option>
                <option value={3}>Sight</option>
                <option value={4}>Hearing</option>
                <option value={5}>Tact</option>
                <option value={6}>Mental</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} maxLength={50} onChange={(event) => onScenarioChange(event)} value={scenario.description} />
            </Form.Group>

            <Form.Check
              type="switch"
              id="custom-switch"
              label="Set as active"
              checked={active}
              onChange={(event) => onActiveChange(event)}
            />

            <Button variant="primary" type="submit" onSubmit={() => handleSubmit()}>Submit</Button>
          </Form>


        </Col>
      </Row>
    </Container>
  );
}

ScenariosForm.propTypes = {
	scenarios: PropTypes.array
};


export default ScenariosForm;
