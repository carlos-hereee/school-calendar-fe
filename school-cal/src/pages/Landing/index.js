/* eslint-disable */

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LandingNavbar from './LandingNavbar'
import SignInNav from "../../components/Navbar/signinnav"
import ReactGA from 'react-ga';
import AppleCal from '../../assets/images/apple-cal.jpg'
import '../../index.css'


export default function Landing() {
    ReactGA.pageview(window.location.pathname + window.location.search);

  return (
     <div className='container'>
     <SignInNav/>
     <div className='landing-grid-container' style={{background:"#A35629"}}>
       {/* <img
            className='landing-img'
            src={AppleCal}
            alt={"desktopCalendar"}
          /> */}
          <Link className='landing-link' to='/sign-in' style={{background:"white", color:"#F5945B", border: "2px solid #F5945B", borderRadius:"5px"}}>Sign In</Link></div>
           <div><Link className='landing-link2' to='/register' style={{background: "#F5945B", color:"#21242C", borderRadius:"5px"}}>Sign Up</Link></div>
     </div>
        

  )
}
