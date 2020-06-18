import React, { useContext } from "react";
import { Header } from '../elements/Header';
import '../index.css';
import { ConfigContext } from "../App";

export const Home = () =>{

  const context = useContext(ConfigContext);

  if(context.IsDatabaseInitialized){
    return (
        <div className="App">
            <Header />
            <p>Add some clever comment about the game here!</p>
            <a className="nav-link" href="/Rating" >Rating</a>
        </div>
    );
  }else{
    return (
        <div className="App">
            <Header />
            <p>We are experiencing a problem, and that's very irritating. Come back
            later!</p>
        </div>
    );
  }
}

export default Home;