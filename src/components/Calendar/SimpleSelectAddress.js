import React from 'react';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { recordAtHomeEvent } from '../../actions/eventActions';


class SwitchLabels extends React.Component {
  state = {
    checkedE: true,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  onBlur = () => {
    const { checkedE } = this.state;
    const { recordAtHomeEvent } = this.props;
    recordAtHomeEvent(checkedE);
  }

  render() {
    const { checkedE } = this.state;
    return (
      <FormGroup row onBlur={() => this.onBlur()}>
        <FormControlLabel
          control={(
            <Switch
              checked={checkedE}
              onChange={this.handleChange('checkedE')}
              value="checkedE"
            />)}
          label="Utiliser l'adresse du domicile de Maurice"
        />
      </FormGroup>
    );
  }
}

// const mapStateToProps = state => ({
//   checkedE: state.event.atHomeEvent,
// });

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    recordAtHomeEvent,
  },
)(SwitchLabels);
