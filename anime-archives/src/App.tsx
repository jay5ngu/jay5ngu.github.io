import { Routes, Route } from 'react-router-dom'

// CSS Styling
import './css/App.css'
import './css/book.css'
import './css/shelf.css'
import './css/componenets.css'

import Home from './components/Home'
import LoginScreen from './components/Login'
import AddShow from './components/AddShow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/addShow" element={<AddShow />} />
    </Routes>
  )
}

export default App