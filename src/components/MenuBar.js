import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	Divider,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    flexGrow: 1,
    textAlign: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  list: {
    width: '100%',
  },
  listItemTextRoot: {
    textAlign: 'center',
	},
	link: {
		textDecoration: 'none',
	},
});

class MenuBar extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Menu</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
							<Link to="/tableau_de_bord" className={classes.link}>
								<ListItem button>
									<ListItemText primary="Tableau de bord" classes={{ root: classes.listItemTextRoot }}/>
								</ListItem>
							</Link>
              <Divider />
							<Link to="/calendrier" className={classes.link}>
								<ListItem button>
									<ListItemText primary="Calendrier" classes={{ root: classes.listItemTextRoot }}/>
								</ListItem>
							</Link>
              <Divider />
							<Link to="/contacts" className={classes.link}>
								<ListItem button>
									<ListItemText primary="Contacts" classes={{ root: classes.listItemTextRoot }}/>
								</ListItem>
							</Link>
							<Divider />
              <ListItem button>
                <ListItemText primary="Suivi" classes={{ root: classes.listItemTextRoot }}/>
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);
