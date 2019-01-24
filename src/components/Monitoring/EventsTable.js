import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import { TableFooter, TablePagination } from '@material-ui/core';

class EventsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
    };
  }

  formatDate = date => date.slice(0, 10).split('-').reverse().join('/');

  iconifyMood = (mood) => {
    switch (mood) {
      case 10: return <SentimentSatisfiedAlt style={{ color: '#11cef4' }} />;
      case 5: return <SentimentSatisfied style={{ color: '#4eb1ba' }} />;
      case 0: return <SentimentVeryDissatisfied style={{ color: '#f27460' }} />;
      default: return '...';
    }
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = (e) => {
    this.setState({ rowsPerPage: e.target.value });
  }

  render() {
    const { page, rowsPerPage } = this.state;
    const { events } = this.props;
    const style = { fontSize: 18 };
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={style}>Date</TableCell>
            <TableCell align="right" style={style}>Visite</TableCell>
            <TableCell align="right" style={style}>Responsable</TableCell>
            <TableCell align="right" style={style}>Humeur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(e => (
            <TableRow key={e.id}>
              <TableCell style={style}>{this.formatDate(e.startingDate)}</TableCell>
              <TableCell align="right" style={style}>{e.title}</TableCell>
              <TableCell align="right" style={style}>{e.contact}</TableCell>
              <TableCell align="right">{this.iconifyMood(e.mood)}</TableCell>
            </TableRow>))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={3}
              count={events.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default EventsTable;
