import './App.css'
import Desktop from './components/Desktop'
import Bar from './components/Task Bar/Bar'
import { TabContextProvider } from './components/Task Bar/TabContext'

function App() {

  return (
    <>
      <div className='grain-bg'/>
      <TabContextProvider>
        <Desktop/>
        <Bar/>
      </TabContextProvider>
    </>
  )
}

export default App
