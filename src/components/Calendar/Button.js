import React from 'react';
import Button from '@material-ui/core/Button';
import DialogEvent from './DialogEvent';


export default class FormDialog extends React.Component {
    state = {
      open: false,
    };

    toggleOpening = () => {
      this.setState({ open:!this.state.open })
    }

    render() {
      return (
        <div>
          <Button onClick={this.toggleOpening}>+</Button>
          <DialogEvent onOpen={() => this.toggleOpening()} openOrNot={this.state.open} dDate={this.props.date}/>
        </div>
      );
    }
}
