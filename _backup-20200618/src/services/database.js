import PostScenarios from '../data/db-scenarios.json';
import PostCategories from '../data/db-categories.json';

export default class LocalStorageDatabase {

  postScenarios;
  postCategories;

  constructor() {
    localStorage.clear();

    this.postScenarios = PostScenarios;
    this.postCategories = PostCategories;
  }

  initialize() {
    try {
      localStorage.setItem('scenarios', JSON.stringify(this.postScenarios));
      localStorage.setItem('categories', JSON.stringify(this.postCategories));

      return true;

    } catch (error) {
      console.error('Could not create local storage database', error);
      return false;
    }
  }

}

export const IsDatabaseInitialized = () => {
  const database = new LocalStorageDatabase();
  
  // console.log(localStorage);
  // console.log(localStorage);
  const isDatabaseInitialized = database.initialize();

  return (isDatabaseInitialized ? true : false);
}

export const GetDatabase = () =>{
  const scenariosFromDB = JSON.parse(localStorage.getItem("scenarios"));
  return scenariosFromDB;
}

export const GetPlayableScenarios = () =>{
  const scenariosFromDB = JSON.parse(localStorage.getItem("scenarios"));
  const filteredDB = scenariosFromDB.filter(db => db.active === true);
  return filteredDB;
}

//merge these two later on
export const GetCategory = () =>{
  const categoryFromDB = JSON.parse(localStorage.getItem("categories"));
  return categoryFromDB;
}

export const EditScenarios = (type, data) => {
  let scenariosFromDB = JSON.parse(localStorage.getItem('scenarios'));
  switch(type) {
    case 'Create': createScenario(data, scenariosFromDB); break;
    case 'Update': updateScenario(data, scenariosFromDB); break;
    case 'Delete': deleteScenario(data, scenariosFromDB); break;
    default: return false;
  }
}

const createScenario = (props, scenariosFromDB) => {
  let newRow = {
    'id' : scenariosFromDB.length,
    'scenario' : props.scenario,
    'category' : props.category,
    'active' : props.active
  }  
  
  scenariosFromDB.push(newRow);
  updateLocalStorage(scenariosFromDB, 'scenarios');
}

const updateScenario = (props, scenariosFromDB) => {

  let updatedRow = {
    'id' : props.id.value,
    'scenario' : props.scenario,
    'category' : props.category,
    'active' : props.active
  }

  let objIndex = scenariosFromDB.findIndex((obj => obj.id === props.id.value));
  scenariosFromDB[objIndex] = updatedRow;
  updateLocalStorage(scenariosFromDB, 'scenarios');
}

const deleteScenario = (props, scenariosFromDB) => {
  let objIndex = scenariosFromDB.findIndex((obj => obj.id === props));
  scenariosFromDB.splice(objIndex, 1);
  updateLocalStorage(scenariosFromDB, 'scenarios');
}

const updateLocalStorage = (data, target) => {
  localStorage.setItem(target, JSON.stringify(data));
}