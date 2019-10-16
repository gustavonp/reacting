import React from 'react';
import ReactDOM from 'react-dom';
import PostScenarios from './data/db-scenarios.json'
import PostCategories from './data/db-categories.json'
import './index.css';

//DONE Criar DBs
//DONE puxar infos
//DONE randomizar
//DONE puxar 2
// trocar o não escolhido
// salvar as votações
// se o match já foi, trocar
// criar botão de parar
// mostrar todos os votos
// se todas as possibilidades com o "mais odiado" acabar, trocar os dois
// se todasas possibilidadex esgorarem, terminar o jogo

function createDB(){
  localStorage.clear();
  var objs = PostScenarios;
  var objc = PostCategories;
  var myData = []
  myData[0] = JSON.stringify(objs);
  myData[1] = JSON.stringify(objc);
  localStorage.setItem('scenarios', myData[0]);
  localStorage.setItem('categories', myData[1]);
}

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function reshuffle (choice, replace, pressed){

  //ver pq não está trocando os dois botões
  var toTrade = ((pressed.id == 'optionA') ? "optionB" : "optionA");
  var scenarios = JSON.parse(localStorage.getItem('scenarios'));
  shuffle(scenarios);

  console.log(choice);  
  console.log(replace);  
  console.log(pressed);  

  console.log('entrei');  
  
  var newScenarioOne = [];
  newScenarioOne['id'] = choice;
  newScenarioOne['scenario'] = pressed.innerHTML;


  var x = 0
  for(x = 0; x < scenarios.length; x++){
    if(scenarios[x].id != choice && scenarios[x].id != replace){
     
      var newScenarioTwo = [];
      newScenarioTwo['id'] = scenarios[x].id;
      newScenarioTwo['scenario'] = scenarios[x].scenario;

      
    //  console.log(document.getElementById(toTrade));
      
    //  App.renderOptions(newScenarioOne, newScenarioTwo);
    document.getElementById(toTrade).value = scenarios[x].id;
    document.getElementById(toTrade).innerHTML = scenarios[x].scenario;
    document.getElementById(toTrade).id = document.getElementById(toTrade).id;
    /*
      */  

      break;
    }

  //  localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }

  return [newScenarioOne, newScenarioTwo];
}

class App extends React.Component{

  render() {
    createDB();
    var dados = [];
    dados[0] = JSON.parse(localStorage.getItem('scenarios'));
    dados[1] = JSON.parse(localStorage.getItem('categories'));

    return (
      <div className='App'>
        <h1>Infuri<i>rating</i></h1>
        <MainProgram
        //  scenarios={dados[0]}
        //  categories={dados[1]}
        />
      </div>
    );
  }
}

class MainProgram extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      votes: [],
      chosen: null,
      turns: 0
    }
  }

  handleClick(choice, replace){
    let scenes = JSON.parse(localStorage.getItem('scenarios'));
    this.state.chosen = choice;
    this.state.turns++;
    this.state.matches.push([choice, replace])

    /*
    */
    console.log('choice = ' + choice);
    console.log('A = ' + document.getElementById('optionA').value);
    console.log('B = ' + document.getElementById('optionB').value);



  var took = [];
    if(document.getElementById('optionA').value == choice){
      took = reshuffle(choice, replace, document.getElementById('optionA'));
  //  }else if(document.getElementById('optionB').value == choice){
    }else{
      took = reshuffle(choice, replace, document.getElementById('optionB'));
    }

    console.log(took[0]);

    var thing1 = 
    {
      id: parseInt(took[0]['id']),
      scenario: took[0]['scenario']
    };

    var thing2 = 
    {
      id: parseInt(took[1]['id']),
      scenario: took[1]['scenario']
    };

    this.renderOptions(thing1, thing2);
    // localStorage.setItem('scenarios', JSON.stringify(scenarios));


  }

  renderOptions(scenarioOne, scenarioTwo){

    return(
      <div className='Scenarios'>
        <div className='caseA'>
  
          <button id="optionA" type="button" value={scenarioOne.id} onClick={() => this.handleClick(scenarioOne.id, scenarioTwo.id)}>{scenarioOne.scenario}</button>
        
        </div>
        <div className='or'>OR</div>
        <div className='caseB'>

          <button id="optionB" type="button" value={scenarioTwo.id} onClick={() => this.handleClick(scenarioTwo.id, scenarioOne.id)}>{scenarioTwo.scenario}</button>
        
        </div>
      </div>
    );
  }

  render(){
    var scenarios = JSON.parse(localStorage.getItem('scenarios'));
    shuffle(scenarios);

    return(
      <div className='MainProgram'>
        <p>Which one is the worst?</p>
        <center>
          {this.renderOptions(scenarios[0], scenarios[1])}
        </center>
      </div>
    );
  }
}

/*
function Poste(props){
  var heyyou = [];
  heyyou.push(
    <div>
      <h1>{props.title}</h1>
      <button className="Item" onClick={props.onClick}>
       'Delete '{props.id}
      </button>
    </div>
  );
  return(heyyou);
}
*/

/*

  class PostList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        content: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderItem(item){
      return(
        <Poste
          title={item.title}
          id={item.id}
          onClick={(i) => this.removeDb(item.id)}
          key={item.id}
        />);
    }

    renderPost(){
      var cat = JSON.parse(localStorage.getItem('conteudo'));
      return(
        <div>
        {cat.map((PostDetail, index)=>{
          if(PostDetail !== null){
          return(
            <div className="board-row" key={PostDetail.id}>
              {this.renderItem(PostDetail)}
            </div>
          )
          }
        })}
        </div>
      );
    }

    handleChange(event) {
      if(event.target.name == 'title'){
        this.setState({title: event.target.value});
      }
      if(event.target.name == 'content'){
        this.setState({content: event.target.value});
      }
    }

    addDB(newObj){
      let numero = JSON.parse(localStorage.getItem('conteudo'));
      numero.push(newObj);
      localStorage.setItem('conteudo', JSON.stringify(numero));
    }

    removeDb(toRemove){
      let numero = JSON.parse(localStorage.getItem('conteudo'));
      for(let i = 0; i < numero.length; i++){
        if(numero[i] != null){
          if(numero[i].id == toRemove){
            delete numero[i];
          }
        }
      }
      localStorage.setItem('conteudo', JSON.stringify(numero));
      this.setState(this.renderPost());
    }

    nextID(){
      let alldb = JSON.parse(localStorage.getItem('conteudo'));
      return(alldb[alldb.length-1].id +1);
    }

    handleSubmit(event) {
      var slugged = this.state.title.replace(" ", "-");     
      var newid = this.nextID();
      var newitem = {
        id: newid,
        title: this.state.title,
        content: this.state.content,
        slug: slugged
      };
  
      this.addDB(newitem);
      this.setState(this.renderPost());
  
      event.preventDefault();
    }

    renderForm(){
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text"  name="title" value={this.state.value} onChange={this.handleChange} />
            </label>
    
            <label>
              Name:
              <input type="text" name="content" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }

    render(){
      return(
        <div>
          <div className='form'>
            {this.renderForm()}
          </div>
          {this.renderPost()}
        </div>
      )
    }
  }
  */
  

  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );