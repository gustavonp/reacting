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
  const isDatabaseInitialized = database.initialize();
  return (isDatabaseInitialized ? true : false);
}

export const GetDatabase = () =>{
  const scenariosFromDB = JSON.parse(localStorage.getItem("scenarios"));
  return scenariosFromDB;
}

//merge these two later on
export const GetCategory = () =>{
  const categoryFromDB = JSON.parse(localStorage.getItem("categories"));
  return categoryFromDB;
}