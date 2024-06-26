import React from 'react'
import './CoinBox.css'
import coinimg from '../../assets/coin.png'
import axios from 'axios';
import {domain} from '../config'

function CoinBox(props) {



  const handleCoinBoxClick = async () => {
    try {
      const response = await axios.post(`${domain}/attendance`, {}, { withCredentials: true });
      console.log(response.data.message);
      alert(response.data.msg);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(err.response.data);
        alert(err.response.data.msg);
      } else if (err.request) {
        // The request was made but no response was received
        console.error(err.request);
        alert('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', err.message);
        alert('Error', err.message);
      }
    }
  };

  return (
    <div className='coinbox-container' onClick={handleCoinBoxClick}>
        <div className='coinbox-amount' style={{color:"white"}}>{props.coinboxAmount}</div>
        <div className="coinbox-image">
            <img src={coinimg} alt="" />
        </div>
        <div className="coinbox-day" style={{color:"white"}}>{props.coinboxDay}</div>
    </div>
  )
}

export default CoinBox