import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const UTCDatetime = () => {
  const [istTime, setISTTime] = useState(getISTDatetime());

  function getISTDatetime() {
    const utcDatetime = new Date();
    const istDatetime = new Date(utcDatetime.getTime() + (utcDatetime.getTimezoneOffset() + 330) * 60000);
    return istDatetime.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setISTTime(getISTDatetime());
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: '400',
        fontSize: { xs: '10px', sm: '12px' },
        color: 'rgba(255, 255, 255, .7)',
        lineHeight: 1,
        paddingRight: '2px',
        fontFamily: 'Poppins',
      }}
    >
      {istTime} IST
    </Typography>
  );
};

export default UTCDatetime;
