// import logo from './logo.svg';
import "./App.css";
import * as React from "react";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter(
        (story) => action.payload.objectID !== story.objectID
      )
    default:
      throw new Error()
  }
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const initialStories = [
    {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  //A
  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
    );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [searchTerm, setSearchTerm] = useStorageState('search' ,'React')
  // const [searchTerm, setSearchTerm] = useStorageState("React");



  React.useEffect(() => {
    setIsLoading(true)

    getAsyncStories().then((result) => {

      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.stories,
      })
      setIsLoading(false)
    })
    .catch(()=> setIsError(true))
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (item) => {
    // const newStories = stories.filter(
    //   (story) => item.objectID !== story.objectID
    // );
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    })
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker stories</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      {/* <Search search = {searchTerm} onSearch={handleSearch}/> */}

      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
          <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleDelete} />
      )}

    </div>
  );
};

const InputWithLabel = ({
  id,
  label,
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

const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />

    {/* <p>
    Searching for <strong>{searchTerm}</strong>
  </p> */}
  </>
);

// const handleChange = (event) => {
//   setSearchTerm(event.target.value)
//   props.onSearch(event)
// }

// return(
// }

export default App;
