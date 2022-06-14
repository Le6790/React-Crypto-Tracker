import React from 'react'
import './Coin.css'
const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap }) => {
  const handle_img_error = () => {
    return (<div></div>)
  }
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="" onError={handle_img_error}/>
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        

        <div className="coin-data">
          <p className="coin-price">${price}</p>
          <p className="coin-volume">${volume}</p>
          { priceChange < 0 ? (
            <p className="coin-percent red">{priceChange}</p>
          ) : (
            <p className="coin-percent green">{priceChange}</p>
          )}
          <p className="coin-marketcap">{marketcap}</p>
        </div>
      </div>
    </div>
  )
}

export default Coin