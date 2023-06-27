import { useState } from 'react';
import { useSelector } from 'react-redux';
import DetailEvent from './DetailEvent';
import ReactBigCalendar from './ReactBigCalender';
import AddEvent from './AddEvent';

type archorE={
  target:Element | null
  event:any
}

const  Calendar =()=> {
  const [anchorEl, setAnchorEl] = useState<archorE>({target:null , event:null});
  const {eventsJob} = useSelector((state:RootState)=>state.calenderApp);

  const eventsJobConvert = eventsJob?.map((event:any) =>{
    if(event.id) return {...event,start: new Date(Date.parse(event?.start)), end: new Date(Date.parse(event?.end))}
    return event
  })

  const handleClick = (event:any) => {
    setTimeout(() => {
      const target:Element = document.getElementsByClassName('rbc-selected')[0];
      setAnchorEl({
        event,
        target
      });
    }, 200);
  };

  const handleClose = () => {
    setAnchorEl({target:null , event:null});
  };


  return (
    <>
      <ReactBigCalendar handleClick={handleClick} eventsJobConvert={eventsJobConvert} />
      <AddEvent/>
      <DetailEvent handleClose={handleClose} eventsJobConvert={anchorEl?.event} anchorEl={anchorEl?.target} />
    </>
  );
}

export default Calendar;
