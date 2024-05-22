import React from "react";
import axios from 'axios';

const Registration = () => {

  const createnewUser = async () => {
    await axios.post('/api/v1/signup', { username: '0', password: '0' }).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <div>
      <button onClick={createnewUser}>
      Create
      </button>
    </div>
  )
}

export default Registration;
