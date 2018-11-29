import React from "react";
import calendarLittle from "../../assets/calendarLittle.png";

const CarlendarLittle = () => {
  return (
    <div className='divCalendarLittle'>
      <p className='textCalendar'>Événements des 7 jours à venir</p>
      <img src={calendarLittle} className='calendarLittle' alt='Calendar' />
      
    </div>
  );
};
export default CarlendarLittle;
