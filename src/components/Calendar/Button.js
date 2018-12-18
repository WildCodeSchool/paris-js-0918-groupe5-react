import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogEvent from './DialogEvent';


export default class FormDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    FormDialog.propTypes = {
      date: PropTypes.string.isRequired,
    };
  }

  toggleOpening = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { open } = this.state;
    const { date } = this.props;
    return (
      <div>
        <Button onClick={this.toggleOpening}>+</Button>
        <DialogEvent onOpen={() => this.toggleOpening()} openOrNot={open} dDate={date} />
      </div>
    );
  }
}
