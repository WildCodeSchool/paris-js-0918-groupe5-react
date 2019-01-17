import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Coverflow from 'react-coverflow';
import {
  Fab,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { displayDialogReceiver } from '../../actions/displayActions';
import DialogReceiver from './DialogReceiver';
import './CoverflowButtons.css';

const styles = theme => ({
  coverflow: {
    '&:focus': {
      outline: 'none',
    },
  },
  typoRoot: {
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
});

class CoverflowAdd extends Component {
  handleClickAdd = () => {
    const { displayDialogReceiver } = this.props;
    displayDialogReceiver(true);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="CoverflowButtons">
        <Coverflow
          displayQuantityOfSide={2}
          enableHeading={false}
          enableScroll={false}
          active={0}
          className={classes.coverflow}
          currentFigureScale={1.2}
          otherFigureScale={0.7}
        >
          <div
            role="menuitem"
            tabIndex={0}
          >
            <Fab color="secondary" aria-label="Add" onClick={this.handleClickAdd}>
              <AddIcon />
            </Fab>
            <Typography
              variant="h5"
              color="textSecondary"
              gutterBottom={false}
              classes={{
                root: classes.typoRoot,
              }}
            >
              Ajouter
            </Typography>
          </div>
        </Coverflow>
        <DialogReceiver />
      </div>
    );
  }
}

export default connect(
  null,
  { displayDialogReceiver },
)(withStyles(styles)(CoverflowAdd));
