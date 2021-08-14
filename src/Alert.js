import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  //set timeout when this componebt renders
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
    //so this will be triggered only at list change
  }, [list]);

  //the type would be apply as css
  //the alert class used to styke the alert
  //then the alert-{type} will be for backgroynd color

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
