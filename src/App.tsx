import './App.css'
import Desktop from './components/Desktop'
import Bar from './components/Task Bar/Bar'
import { TabContextProvider } from './components/Task Bar/TabContext'
import { FileSystemContextProvider } from './components/File System/FileSystemContext'

function App() {

  return (
    <>
      <div className='grain-bg'/>
      <TabContextProvider>
        <FileSystemContextProvider>
          <Desktop/>
          <Bar/>
        </FileSystemContextProvider>
      </TabContextProvider>
    </>
  )
}

export default App
