
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      })
  }, []);

  function sortByName(a,b){
    if (a.name < b.name){
      return -1;
    }
    if (a.name > b.name){
      return 1;
    }

    return 0;
  }

  const sortOnClicked = e =>{
    console.log("Sort clicked!!!")
    let sorted_coins = [].concat(coins.sort(sortByName));
    console.log(sorted_coins)
    setCoins(sorted_coins);
  }

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search"
            className="coin-input" onChange={handleChange} />
        </form>
        <button className="coin-input" onClick={sortOnClicked}>Sort</button>
      </div>
      <Coin key={"1"} name={"Name"}
         
          symbol={"SYMBOL"}
          marketcap={"MARKET CAP"}
          price={"PRICE"}
          priceChange={"CHANGE"}
          volume={"VOLUME"}>
      ></Coin>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={`MKT CAP: \$${coin.market_cap}`}
          price={coin.current_price.toLocaleString()}
          priceChange={coin.price_change_percentage_24h.toFixed(2)}
          volume={coin.total_volume.toLocaleString()}></Coin>
        )
      })}
    </div>
  );
}

export default App;
