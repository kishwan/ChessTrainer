import Board from "./components/Board";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

export default function App() {
  return <Board />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
