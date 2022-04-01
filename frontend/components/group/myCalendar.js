import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { eventService, alertService } from '../../services';
import Calendar from 'react-calendar';

export default function MyCalendar() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([])
  const router = useRouter();
  const { group_id } = router.query;

  useEffect(() => {
    eventService.getByGroupId(group_id)
        .then((result) => {
            setIsLoaded(true);
            setItems(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
    )
  }, [])

  function getTileContent(calendar) {
    let year = calendar.date.getFullYear();
    let month = calendar.date.getMonth() + 1;
    let day = calendar.date.getDate();
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    let formatDate = `${year}-${month}-${day}`;
    let message = "";

    items.forEach(element => {
      if(formatDate === element.starttime.slice(0, 10)){
        message = `${element.starttime.slice(11, 16)}\n${element.title}`
      }
    })
    return(<p>{message}</p>)
  }

  return(
    <div>
    <Calendar
      value={new Date()}
      tileContent={getTileContent}
    />
  </div>
  )
}