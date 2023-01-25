// import logo from './logo.svg';
import "./App.css";
import * as React from "react";
import axios from 'axios';
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit = {onSearchSubmit}>
        <InputWithLabel
          id="search"
          value={searchTerm}
          isFocused
          onInputChange={onSearchInput}
          >
          <strong>Search: </strong>
          </InputWithLabel>
          <button
            type="submit"
            disabled = {!searchTerm}
            >Submit
          </button>
      </form>
)

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};



const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading:true,
        isError: false
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading:false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading:false,
        isError: true,
      }
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      }
    default:
      throw new Error();
  }
}




const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState('search' ,'React')

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  )

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`)
    event.preventDefault()
  }
  //A
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {data: [], isLoading: false, isError: false}
    );

    const handleFetchStories = React.useCallback(async() => {

      if(!searchTerm) return;

      dispatchStories({type: 'STORIES_FETCH_INIT'})

      try{
        const result = await axios.get(url)
          
          dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.hits,
          })
      } catch {
        dispatchStories({type: 'STORIES_FETCH_FAILURE'})
      }
    }, [url]);

    React.useEffect(() => {
      handleFetchStories();
    }, [handleFetchStories]);
    
  const handleDelete = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker stories</h1>
      
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchInput}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
          <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleDelete} />
      )}

    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  //A
  const inputRef = React.useRef();

  //C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => {
  // const myList = [1,2,3,4]
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item onRemoveItem={onRemoveItem} key={item.objectID} item={item} />
        );
      })}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };

  return (
    <li>
      <span>
        <a href={item.url}> {item.title}</a>
      </span>
      <span> {item.author}</span>
      <span> {item.num_contents}</span>
      <span> {item.points} </span>
      <button type="button" onClick={handleRemoveItem}>
        Remove
      </button>
    </li>
  );
};

// const Search = ({ search, onSearch }) => (
//   <>
//     <label htmlFor="search">Search: </label>
//     <input id="search" type="text" value={search} onChange={onSearch} />

//     {/* <p>
//     Searching for <strong>{searchTerm}</strong>
//   </p> */}
//   </>
// );

// const handleChange = (event) => {
//   setSearchTerm(event.target.value)
//   props.onSearch(event)
// }

// return(
// }

export default App;
