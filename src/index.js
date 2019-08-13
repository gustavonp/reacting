import React from 'react';
import ReactDOM from 'react-dom';
import PostData from './data/database.json'
import './index.css';

//DONE -- USAR LOCAL STORAGE DONE
//DONE -- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
//DONE -- puxar as funções para fora da class App
//DONE -- fazer update na tela
// -- criar um form para dar Add
//Tentar deixar mais dry

//Começar a planejar o hate-game

function createDB(){
  localStorage.clear();
  var obj = PostData;
  var myData = JSON.stringify(obj);
  localStorage.setItem('conteudo', myData);
}

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

/*
  {
    "id" : 2,
    "title" : "bonjour, monde!",
    "content" : "Maçã",
    "slug" : "bonjour-monde"
  },
*/

const formValid = formErrors =>{

  console.log('hi!');
  console.log(Object.values);

  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  return valid;
}

class Formulario extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id:null,
      title: null,
      content: null,
      slug: null,
      aprove: true
    }
  }

  handleSubmit = e =>{
    e.preventDefault();

    //console.log(this.state.title);
    console.log(this);
  }

  render(){
    return(
      <div id="formulario" >
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="title">
            <label htmlFor="title">Greeting: </label>
            <input 
              type="text" 
              className="titleInput" 
              placeholder="First title" 
              name="title"
              value={this.state.title}
              noValidate
            />
          </div>
          <div className="content">
            <label htmlFor="content">Greeting: </label>
            <input 
              type="text" 
              className="contentInput" 
              placeholder="word content" 
              name="content"
              value={this.state.content}
              noValidate
            />
          </div>
          <div className="createEntry">
            <button type="submit">Ok!</button>
          </div>
        </form>
      </div>
    );
  }
}

  class PostList extends React.Component {
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
      this.setState(this.renderPost()

      );
    }

    render(){
      return(
        <div>
          {this.renderPost()}
        </div>
      )
    }
  }
  
  class App extends React.Component {

    render() {
      createDB();
      var dados = JSON.parse(localStorage.getItem('conteudo'));
        
      return (
        <div className='App'>
          <h1>Hellos</h1>
          <Formulario

          />
          <PostList
            cat={dados}
            onClick={(i) => this.deleteItem(i)}
          />    
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );