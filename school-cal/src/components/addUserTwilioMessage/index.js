import React, { useState } from "react";
import axios from 'axios'

const TwilioMessage = () =>{
  const [user, setUser] = useState({ phone: ""});

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:4000/api/twilio`,{phone:user.phone})
    .then(res =>{
        console.log(res);
    })
  };

  return (
    <>
      <form onSubmit={event => handleSubmit(event)}>
          <input
            type="text"
            name="phone"
            placeholder="Subscriber Phone"
            value={user.phone}
            onChange={event => handleChange(event)}
          />
        
        <button>Add</button>
      </form>
    </>
  );
}

export default TwilioMessage;