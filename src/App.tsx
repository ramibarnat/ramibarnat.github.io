import './App.css'
import Desktop from './components/Desktop'
import Bar from './components/task-bar/Bar'
import { TabContextProvider } from './components/task-bar/TabContext'
import { FileSystemContextProvider } from './components/file-system/FileSystemContext'

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
