import { Routes, Route } from 'react-router-dom'

// CSS Styling
import './css/App.css'
import './css/book.css'
import './css/shelf.css'
import './css/componenets.css'

import Home from './componenets/Home'
import LoginScreen from './componenets/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  )
}

export default App