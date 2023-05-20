import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
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
      try {
        document.title = `${search} Music`;
        const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
        const resData = await response.json();
        console.log(resData);
        if (resData.results) {
          setData(resData.results);
        } else {
          setMessage(`We could find nothing for "${search}"`)
        }
      } catch (e) { }
    }
    if (search) {
      fetchData()
    }
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/'
            element={
              <>
                <SearchContext.Provider value={
                  {
                    term: searchInput,
                    handleSearch
                  }
                }>
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                  <Gallery />
                </DataContext.Provider>
              </>
            }
          />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;