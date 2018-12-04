
import React from 'react';
import dateFns from 'date-fns';
// import { locale } from "./locale";
import Button from './Button';
import HeaderCalendar from './HeaderCalendar';
// import EventCalendar from 'react-event-calendar';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(), // the D-Day
    selectedDate: new Date(),
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  };

  renderHeader() {
    const { currentMonth } = this.state;
    const dateFormat = 'MMMM YYYY'; // the format of the month and the year on the top of the calendar
    return (
      <div>
        <HeaderCalendar />
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="iconCalendar" onClick={this.prevMonth}>
              chevron_left
            </div>
            {/* <Button dDate={this.state.currentMonth}/> */}
          </div>
          <div className="col col-center">
            <span>{dateFns.format(currentMonth, dateFormat)}</span> {/* it shows the name of the month and the year */}
          </div>
          <div className="col col-end" onClick={this.nextMonth}>
            <div className="iconCalendar">chevron_right</div>
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const { currentMonth } = this.state;
    const dateFormat = 'dddd'; // the format of the name of the days
    const days = [];
    // the date where begins the calendar, sunday,
    // and the date of the last line with more than 1 date
    const startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {/* i+1 makes the week begin with monday instead of sunday */}
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>,
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span> {/*the small number in the cell */}
            <span className="bg">{formattedDate}</span> {/*the big number on the hover of a cell*/}
            <Button dDate={currentMonth} />
          </div>,
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default Calendar;
