import { useState, useRef } from 'react';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import { DataContext } from './contexts/DataContexts';
import { SearchContext } from './contexts/SearchContext';
import './App.css';

function App() {
  let [message, setMessage] = useState('Search for Music');
  let [data, setData] = useState([]);
  let searchInput = useRef(' ');

  const handleSearch = (e, search) => {
    e.preventDefault();
    const fetchData = async () => {
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
      const resData = await response.json();
      console.log(resData);
      if (resData.results) {
        setData(resData.results);
      } else {
        setMessage(`We could find nothing for "${search}"`)
      }
    }
    if (search) {
      try {
        fetchData()
      } catch (e) { }

    }
  }

  return (
    <div className="App">
      <SearchContext.Provider value={
        {
          term: searchInput,
          handleSearch
        }
      }>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;