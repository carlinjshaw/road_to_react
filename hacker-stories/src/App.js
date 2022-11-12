import logo from './logo.svg';
import './App.css';

function App() {
const myList = [1,2,3,4]
let counter = -1;

  return (
    <div>
      <h1>Hello World!!</h1>
      
      <ul>
        {myList.map(function (item) {
          counter ++;
          return <li key = {counter}>{item}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
