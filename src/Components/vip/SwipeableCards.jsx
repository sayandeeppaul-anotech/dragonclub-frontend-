// src/components/SwipeableCards.jsx

import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import "./card.css";
import badge1 from "../../assets/badge1.png";
import badge2 from "../../assets/badge2.png";
import badge3 from "../../assets/badge3.png";

import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg3 from "../../assets/bg3.png";

import crownimg from "../../assets/crown.png"
import crownimg2 from "../../assets/crown2.png"
import lock from '../../assets/lock.png'
import diamond from "../../assets/diamond.png"
import gift from "../../assets/gift.png"
import coin from "../../assets/coin.png"
import safe from "../../assets/safe.png"
import stack from "../../assets/stack.png"
import wallet from '../../assets/wallet.png'
import dicon from '../../assets/dicon.png'
import safeicon from "../../assets/safeicon.png"
import stackicon from "../../assets/stackicon.png"


const SwipeableCards = () => {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const cards = [
    {
      main: "VIP 1",
      associated: "Details for Card 1",
      badge: badge1,
      bg: `url(${bg1}) no-repeat center,linear-gradient(117.29deg, #a6b7d0 21.85%, #889ebe 67.02%)`,
      crown: crownimg,
      vipcolor: 'linear-gradient(180.29deg, rgb(240 246 255) 60.85%, rgb(123 124 132) 10.02%)',
      exp: '3000',
      progressbg: 'rgb(116, 138, 170)',
      progressShadow: '0 .01333rem #b1c4e1, inset 0 .05333rem .05333rem #607596',
      bottombg: 'linear-gradient(90deg, #899fbf 0%, #6f85a5 92.31%)',
      levelReward: '60',
      moneyReward: '30',
      safe: '0.1'
    },
    {
      main: "VIP 2",
      associated: "Details for Card 2",
      badge: badge2,
      bg: `url(${bg2}) no-repeat center, linear-gradient(117.29deg, #f8bd83 21.85%, #e2984e 67.02%)`,
      crown: crownimg2,
      vipcolor: ' linear-gradient(180.29deg, rgb(254 254 204) 60.85%, rgb(255 248 84) 30.02%)',
      exp: '30000',
      progressbg: 'rgb(214, 125, 38)',
      progressShadow: '0 .01333rem #ffc387, inset 0 .05333rem .05333rem #ad5913',
      bottombg: 'linear-gradient(90deg, #ef9033 0%, #c97420 92.31%)',
      levelReward: '180',
      moneyReward: '90',
      safe:'0.1'

    },
    {
      main: "VIP 3",
      associated: "Details for Card 3",
      badge: badge3,
      bg: `url(${bg3}) no-repeat center,linear-gradient(117.29deg,#ffa493 21.85%,#ff7878 67.02%)`,
      crown: crownimg2,
      vipcolor: ' linear-gradient(180.29deg, rgb(254 254 204) 60.85%, rgb(255 248 84) 30.02%)',
      exp: '200000',
      progressbg: 'rgb(240, 92, 92)',
      progressShadow: '0 .01333rem #ffada0, inset 0 .05333rem .05333rem #d62f36',
      bottombg: 'linear-gradient(90deg, #ff7878 0%, #f05c5c 92.31%)',
      levelReward: '690',
      moneyReward: '290',
      safe: '0.15'
    },
    // Add more cards as needed
  ];

  return (
    <div>
      <SwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        {cards.map((card, i) => (
          <div key={i} className="card" style={{ background: card.bg }}>
            <div className="top">
              <div className="left">
                <div className="l-top">
                  <div className="l-one">
                    <img src={card.crown} alt="" />
                  </div>
                  <div className="l-two" style={{ backgroundImage: card.vipcolor }}>{card.main}</div>
                  <div className="l-three">
                    <div className="lthreeone">
                      <img src={lock} alt="" />
                    </div>
                    <div className="lthreetwo">not open</div>
                  </div>
                </div>
                <div className="l-mid">Upgrading {card.main} requires</div>
                <div style={{ color: 'white' }}>
                  {card.exp}EXP
                </div>
                <div className="l-bottom">
                  Bet ₹1 = 1EXP
                </div>
              </div>
              <div className="right">
                <div className="image-badge">
                  <img src={card.badge} alt="" />
                </div>
                <div className="right-bottom">
                  {card.main}
                </div>
              </div>
            </div>
            <div className="mid" style={{ background: card.progressbg, boxShadow: card.progressShadow }}>

            </div>
            <div className="bottom">
              <div className="bottom-left" style={{ background: card.bottombg }}>0/
                {card.exp}
              </div>
              <div className="bottom-right">
                {card.exp} can be leveled up
              </div>
            </div>
          </div>
        ))}
      </SwipeableViews>
      <div style={styles.associatedContainer}>
        {cards.map(
          (card, i) =>
            i === index && (
              <div key={i} style={styles.associated}>
                <div className="heading" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div className="d-img">
                    <img src={diamond} alt="" style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div style={{ color: "white", fontSize: "1.3em", fontWeight: 600 }} >
                    VIP Benifit Level
                  </div>
                </div>
                <div className="list" style={{ width: '100%' }}>
                  <div className="list-one" style={{ display: 'flex', gap: '5px', width: '100%', margin: '20px auto' }}>
                    <div className="one-img" >
                      <img src={gift} alt=""  style={{ width: ' 100% ', height: "100%" }}/>
                    </div>
                    <div style={{ width: '80%' }}>
                      <div style={{ color: "white" }} >Level up reward</div>
                      <div style={{ color: "gray" }}>Each account can only recieve 1 time</div>
                    </div>
                    <div style={{ width: "80px", }}>
                      <div style={{ display: "flex", justifyContent: 'space-evenly', margin: '5px auto', border: '1px solid cyan', borderRadius: '10px' }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={wallet} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          {card.levelReward}
                        </div>
                      </div>
                      <div style={{
                        display: "flex", justifyContent: 'space-evenly', margin: '5px auto',
                        border: '1px solid cyan', borderRadius: '10px'
                      }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={dicon} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          0
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="list-one" style={{ display: 'flex', gap: '5px', width: '100%',
                    margin: '20px auto' 
                   }}>
                    <div className="one-img" >
                      <img src={coin} alt="" />
                    </div>
                    <div>
                      <div style={{ color: "white" }} > Monthly reward</div>
                      <div style={{ color: "gray" }}>Each account can only recieve 1 time per month</div>
                    </div>
                    <div style={{ width: "80px", }}>
                      <div style={{ display: "flex", justifyContent: 'space-evenly', margin: '5px auto', border: '1px solid cyan', borderRadius: '10px' }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={wallet} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          {card.moneyReward}
                        </div>
                      </div>
                      <div style={{
                        display: "flex", justifyContent: 'space-evenly', margin: '5px auto',
                        border: '1px solid cyan', borderRadius: '10px'
                      }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={dicon} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          0
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="list-one" style={{ display: 'flex', gap: '5px', width: '100%',margin: '20px auto'  }}>
                    <div className="one-img" >
                      <img  src={safe} alt="" />
                    </div>
                    <div>
                      <div style={{ color: "white" }} > Safe</div>
                      <div style={{ color: "gray" }}>increase the extra income of the safe ...</div>
                    </div>
                    <div style={{ width: "80px" }}>
                      <div style={{ display: "flex", justifyContent: 'space-evenly', margin: '5px auto', border: '1px solid gray',alignContent: 'center', borderRadius: '10px' }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={safeicon} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          {card.safe}
                        </div>
                      </div>
                      
                    </div>
                  </div>

                  <div className="list-one" style={{ display: 'flex', gap: '5px', width: '100%',margin: '20px auto' , justifyContent: 'space-between' }}>
                    <div className="one-img" >
                      <img  src={stack} alt="" />
                    </div>
                    <div>
                      <div style={{ color: "white" }} > Rebate Rate</div>
                      <div style={{ color: "gray" }}>increase income of the rebate </div>
                    </div>
                    <div style={{ width: "80px" }}>
                      <div style={{ display: "flex", justifyContent: 'space-evenly', margin: '5px auto', border: '1px solid gray',alignContent: 'center', borderRadius: '10px' }}>
                        <div style={{ width: '20px', height: '20px' }}>
                          <img src={stackicon} alt="" style={{ width: ' 100% ', height: "100%" }} />
                        </div>
                        <div style={{ color: "white" }}>
                          0.6%
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>


            )
        )}
      </div>
    </div>
  );
};

const styles = {

  associatedContainer: {
    width: '95%',
    margin: '20px auto',
    marginTop: "20px",
    textAlign: "center",
  },
  associated: {
    padding: "10px",
    background: "#2B3270",
    borderRadius: "5px",
  },
};

export default SwipeableCards;

