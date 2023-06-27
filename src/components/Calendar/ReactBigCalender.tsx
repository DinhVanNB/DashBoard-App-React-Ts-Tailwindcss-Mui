import { Calendar , momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import CustomWeekView from './CustomWeekView';
import { useMemo } from "react";

const localizer = momentLocalizer(moment);

interface propsType  {
  eventsJobConvert:any
  handleClick:(event:any)=>void
}

const ReactBigCalendar=({eventsJobConvert, handleClick}:propsType) =>{
  const {language} = useSelector((state:RootState)=>state.appState)
  
  const {views}:any = useMemo(() => ({
    views: {
      month: true,
      week: CustomWeekView,
      day: true,
      agenda: true
    },
  }), []);

  const  eventStyleGetter = (event:any) => {
    const backgroundColor = event.color || '#B3E5FC';
    const style = {
      backgroundColor,
    };
    return {
      style
    };
  }

  return (
    <Paper sx={{padding: '20px', "& .rbc-agenda-content":{color:'white'}
      }} >
      <Calendar
        views={views}
        selectable
        culture={language}
        localizer={localizer}
        messages={message[language]}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsJobConvert}
        onSelectEvent={(selectedEvent:any)=>handleClick(selectedEvent)}
        eventPropGetter={eventStyleGetter}
        style={{  overflow:'auto' , height:'70vh' }}
      />
    </Paper>
  );
};


export default ReactBigCalendar;




const message:any = {
  en: null,
  vi: {
    week: 'Tuần',
    work_week: 'Tuần',
    day: 'Ngày',
    month: 'Tháng',
    previous: 'Trở về',
    next: 'Kế tiếp',
    today: 'Hôm nay',
    agenda: 'Lịch trình',
  }
};


