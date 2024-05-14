import './App.css'
import Desktop from './components/Desktop'
import Bar from './components/Task Bar/Bar'
import { TabContext } from './components/Task Bar/TabContext'

function App() {

  return (
    <>
      <div className='grain-bg'/>
        <Desktop/>
        <Bar/>
    </>
  )
}

export default App
