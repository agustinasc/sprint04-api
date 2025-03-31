import './App.css'
import CharactersList from './components/CharactersList'
import Navbar from './components/Navbar'
import  FavoritesList  from './components/FavoritesList'
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <Navbar/>
      <CharactersList/>
      <ToastContainer/>
      <FavoritesList />
    </>
  )
}

export default App
