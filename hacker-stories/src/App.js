// import logo from './logo.svg';
import './App.css';
import * as React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ]
  
  return (
    <div>
      <h1>My Hacker stories</h1>
      <Search />

      <hr />
      <List list = {stories}/>
    </div>
  );
}

const List = (props) => {
  
  // const myList = [1,2,3,4]
  return (
    <ul>
        {props.list.map((item) => {
          return <Item key = {item.objectID} item = {item}/>
        })}
    </ul>
  )
}

const Item = (props) => (
  <li>
    <span>
      <a href = {props.item.url}> {props.item.title}</a>
    </span>
    <span> {props.item.author}</span>
    <span> {props.item.num_contents}</span>
    <span> {props.item.points}</span>
  </li>
)

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    //synthetic event
    // console.log(event);
    //value of target: (here: element)
    // console.log(event.target.value);

    setSearchTerm(event.target.value)
  }

  return(
    <div>
      <label htmlFor = "search">Search: </label>
      <input id= "search" type = "text" onChange= {handleChange}/>

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>

    </div>
  )
}

export default App;
