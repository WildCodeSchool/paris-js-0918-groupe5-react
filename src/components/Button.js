import React from 'react';
import Button from '@material-ui/core/Button';
import DialogEvent from './DialogEvent';


export default class FormDialog extends React.Component {
 
    state = {
        open: false,
      };

      handleClickOpen = () => {
        this.setState({ open: true });
      };

    

  render() {
      console.log('button', this.state.open)
    return (
      <div>
        <Button onClick={this.handleClickOpen}>+</Button>
        <DialogEvent openOrNot={false} />
      </div>
    );
  }
}
