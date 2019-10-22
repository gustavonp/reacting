import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Dependencies
import LocalStorageDatabase from './services/database';

// Components
import MainProgram from './MainProgram';

/* DN: Move those items to GitHub Issues --> write them in English */
//DONE Criar DBs
//DONE puxar infos
//DONE randomizar
//DONE puxar 2
//DONE Guardar as votações
//DONE se o match já foi, trocar
// trocar o não escolhido -- switch the dataControl updateon the Mainprogram class to setState and sent the "upcoming match" as a new state
// criar botão de parar
// mostrar todos os votos
// se todas as possibilidades com o "mais odiado" acabar, trocar os dois
// se todasas possibilidadex esgorarem, terminar o jogo
/* =============================================================== */

/**
 * Main application
 */
class App extends React.Component {

  // DN: Remove unused code
  /*
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      votes: [],
      chosen: null,
      turns: 0
    };
  }
  */

  database;

  isDatabaseInitialized = false;

  constructor(props) {
    super(props);
    
    this.database = new LocalStorageDatabase();
    this.isDatabaseInitialized = this.database.initialize();   
  }

  render() {
    if (this.isDatabaseInitialized) {

      // DN: Remove unused code
      /*
      */
      // var dados = [];
      // dados[0] = JSON.parse(localStorage.getItem('scenarios'));
      // dados[1] = JSON.parse(localStorage.getItem('categories'));
      return (
        <div className="App">
          <h1>
            Infuri<i>rating</i>
          </h1>
          <MainProgram
            dataControl={this.state}

          // DN: Remove unused code
          //  scenarios={dados[0]}
          //  categories={dados[1]}
          />
        </div>
      );
    } else {
      return (
        <h1>
          We are experiencing a problem, and that's very irritating. Come back
          later!
        </h1>
      );
    }
  }
}


/** 
 * Starting the game
 */
ReactDOM.render(<App />, document.getElementById('root'));
