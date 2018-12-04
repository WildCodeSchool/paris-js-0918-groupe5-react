import React from 'react';
import Button from '@material-ui/core/Button';
import DialogEvent from './DialogEvent';
import PropTypes from 'prop-types';


export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  // FormDialog.propTypes = {
  //   date: PropTypes.string.isRequired,
  // };

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
