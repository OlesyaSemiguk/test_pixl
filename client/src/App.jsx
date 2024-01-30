import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom'
import AppRouter from './routing/AppRouter'
import './reset.css'
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
