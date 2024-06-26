import React from 'react'
import SwipeableCards from './SwipeableCards'
import './VipMain.css'
import avatar from "../../assets/avatar.png"
import vipzero from '../../assets/vip-zero.png'
import FullWidthTabs from './tab'


function VipMain() {
    return (
        <div>
            <div className="topbox">
                <div className='top-left'>
                    <div className="image-box">
                        <img src={avatar} alt="" />
                    </div>
                </div>
                <div className='top-right'>
                    <div className='top-right-top'>
                        <img src={vipzero} alt="" />
                    </div>
                    <div className='top-right-bottom'>Member 1234</div>
                </div>
            </div>
            <div className="bottom-box">

                <div className="exp-box">

                    <div className="exp">
                        <div style={{ color: 'cyan' }}>0 EXP</div>
                        <div style={{ color: 'white' }}>My Experience</div>
                    </div>
                    <div className="exp"><div style={{ color: 'cyan' }}>0 days</div>
                        <div style={{ color: 'white' }}>Payout time</div></div>

                </div>

                <div className='notice-mid'>
                    <div className="n-box">VIP level rewards are settled at 2:00 am on the 1st of every month</div></div>
                <SwipeableCards />
            </div>
            {/* <FullWidthTabs/> */}
            <br></br><br></br><br></br>
        </div>
    )
}

export default VipMain