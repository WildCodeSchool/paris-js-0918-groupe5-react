import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';

const EventsTable = (props) => {
  const { events } = props;

  const formatDate = date => date.slice(0, 10).split('-').reverse().join('/');

  const iconifyMood = (mood) => {
    switch (mood) {
      case 10: return <SentimentSatisfiedAlt />;
      case 5: return <SentimentSatisfied />;
      case 0: return <SentimentVeryDissatisfied />;
      default: return '...';
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Visite</TableCell>
          <TableCell align="right">Responsable</TableCell>
          <TableCell align="right">Humeur</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map(e => (
          <TableRow key={e.id}>
            <TableCell>{formatDate(e.dateBeginning)}</TableCell>
            <TableCell align="right">{e.title}</TableCell>
            <TableCell align="right">{e.responsible}</TableCell>
            <TableCell align="right" style={{ color: '#65cde2' }}>{iconifyMood(e.mood)}</TableCell>
          </TableRow>))}
      </TableBody>
    </Table>
  );
};

export default EventsTable;
