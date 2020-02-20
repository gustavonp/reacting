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
//DONE trocar o não escolhido
//DONE criar botão de parar
//DONE mostrar todos os votos
//DONE se todas as possibilidades com o "mais odiado" acabar, trocar os dois
// fix button position switching
// se todasas possibilidades esgorarem, terminar o jogo
/* =============================================================== */

/**
 * Main application
 */
class App extends React.Component {

  database;

  isDatabaseInitialized = false;

  constructor(props) {
    super(props);
    
    this.database = new LocalStorageDatabase();
    this.isDatabaseInitialized = this.database.initialize();   
  }

  render() {
    if (this.isDatabaseInitialized) {

      return (
        <div className="App">
          <h1>
            Infuri<i>rating</i>
          </h1>
          <MainProgram/>
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
