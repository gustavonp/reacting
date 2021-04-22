import React from 'react';
import { FlexContainer } from './styles';
import { Container, Row, Col } from 'react-bootstrap';
import PanelBox from '../components/PanelBox';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

const Home = (props) => {
  const { history } = props;
  const iconSize = 48;
  const iconColor = 'royalblue';

  return (
    <Container fluid >
      <Row className="justify-content-md-center">
        <Col lg="4" md="8">
          <FlexContainer>
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Scenarios"
              onClick={() => history.push("/controlpanel/scenarios")}
            />
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Categories"
              onClick={() => history.push("/controlpanel/categories")}
            />
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Votes"
              onClick={() => history.push("/controlpanel/votes")}
            />
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Ranking"
              onClick={() => history.push("/controlpanel/ranking")}
            />
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Users"
              onClick={() => history.push("/controlpanel/users")}
            />
            <PanelBox
              size={iconSize}
              color={iconColor}
              icon="Image"
              text="Logs"
              onClick={() => history.push("/controlpanel/logs")}
            />
          </FlexContainer>
        </Col>
      </Row>
    </Container>
  );
}

Home.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(Home);
