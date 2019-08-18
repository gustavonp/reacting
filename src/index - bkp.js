import React from 'react';
import ReactDOM from 'react-dom';
import PostData from './data/db-scenarios.json'
import PostData from './data/db-categories.json'
import './index.css';

//DONE Criar DBs
// puxar infos
// randomizar
// puxar 2
// trocar o não escolhido
// salvar as votações
// se o match já foi, trocar
// criar botão de parar
// mostrar todos os votos
// se todas as possibilidades com o "mais odiado" acabar, trocar os dois
// se todasas possibilidadex esgorarem, terminar o jogo


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
  
  class App extends React.Component {

    render() {
      createDB();
      var dados = JSON.parse(localStorage.getItem('conteudo'));
        
      return (
        <div className='App'>
          <h1>Hellos</h1>
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