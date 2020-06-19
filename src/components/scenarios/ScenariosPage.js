import React from 'react';
import { connect } from 'react-redux';
import * as scenarioActions from '../../redux/actions/scenarioActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class ScenariosPage extends React.Component {
    // state = {
    //   scenario:{
    //     description: "",
    //     category: null
    //   }
    // };


  // handleChange = event => {
  //   const scenario = { ...this.state.scenario, description: event.target.value};
  //   this.setState({scenario});
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.actions.createScenario(this.state.scenario);
  // }

  render(){
    return(
      <>
        <h2>Scenarios</h2>
        {this.props.scenarios.map(scenario => (
          <div key={scenario.description}>{scenario.description}</div>
        ))}
      </>
    );
    // return(
    //   <form onSubmit={this.handleSubmit}>
    //     <h2>Scenarios</h2>
    //     <h3>Add Scenario</h3>
    //     <input type="text" onChange={this.handleChange} value={this.state.scenario.description} />
    //     <input type="submit" value="Save" />
    //     {this.props.scenarios.map(scenario => (
    //       <div key={scenario.description}>{scenario.description}</div>
    //     ))}
    //   </form>
    // );
  }
}

ScenariosPage.propTypes = {
  scenarios: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    scenarios: state.scenarios,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(scenarioActions, dispatch)
  };
}

// export default connect(mapStateToProps)(ScenariosPage);
export default connect(mapStateToProps, mapDispatchToProps)(ScenariosPage);