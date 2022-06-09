// import logo from './logo.svg';
// import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  // API
  const API_URL = 'http://localhost:3500/items';

  // States
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
      } catch (error) {
        console.log(error.stack);
      }
    }

    fetchItems();
    // can use IIFEE to invoke immediately as well:
    // (async () => await fetchItems())();
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1    // sets id value
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setNewItem(listItems);
    setItems(listItems)
  }

  const handleCheck = (id) => {
      // console.log(`key: ${id}`)
      const listItems = items.map((item) => 
      item.id === id ? {...item, checked: !item.checked } : item);
      setItems(listItems)
  }

  const handleDelete = (id) => {
      //console.log(id)
      const listItems = items.filter((item) => {
          return item.id !== id;
      })
      setItems(listItems)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(newItem)
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header
        title="Groceries" 
      />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;
