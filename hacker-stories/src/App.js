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
  //A
  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = (event) => {
    //D
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>My Hacker stories</h1>
      <Search search = {searchTerm} onSearch={handleSearch}/>

      <hr />
      <List list = {searchedStories}/>
    </div>
  );
}


const List = ({list}) => {
  
  // const myList = [1,2,3,4]
  return (
    <ul>
        {list.map(({objectID, ...item}) => {
          return <Item key = {objectID} {...item}/>
        })}
    </ul>
  )
}

const Item = ({url,title, author, num_contents, points}) => (
  <li>
    <span>
      <a href = {url}> {title}</a>
    </span>
    <span> {author}</span>
    <span> {num_contents}</span>
    <span> {points}</span>
  </li>
)

const Search = ({search, onSearch}) =>  (
<div>
  <label htmlFor = "search">Search: </label>
  <input id= "search" type = "text" value={search} onChange= {onSearch}/>

  {/* <p>
    Searching for <strong>{searchTerm}</strong>
  </p> */}

</div>
)

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value)
  //   props.onSearch(event)
  // }

  // return(
// }

export default App;
