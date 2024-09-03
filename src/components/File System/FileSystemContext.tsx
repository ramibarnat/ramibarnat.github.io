import { createContext, FC, ReactNode, useState } from "react"
import FolderIcon from "../Apps/FolderIcon"

interface FileChildrenType {
    children: Record<string,React.ComponentType<any>>,
    parent: string | null,
    name: string
}

interface FileSystemContextType {
    folders: Record<string,FileChildrenType>,   
    addFolder: (id: string, parent: string, name: string) => void,
    addApp: (id: string, parent: string, name: string, component: React.ComponentType<any>, x_pos: number, y_pos: number) => void,
    removeFolder: (id:string) => void,
}

const FileSystemContext = createContext<FileSystemContextType>({
    folders: {},
    addFolder: () => {},
    addApp: () => {},
    removeFolder: () => {},
});

interface ProviderProps {
    children: ReactNode
}


const FileSystemProvider: FC<ProviderProps> = ({children}) => {
    const [folders, setFolders] = useState<Record<string,FileChildrenType>>({});
 
    const addFolder = (id: string, parent: string, name: string) => {
        setFolders(prevFolders => {
            if (prevFolders[id]) {
                console.log("Folder already exists");
                return prevFolders;
            }
            const newFolders = {...prevFolders};
            
            newFolders[id] = {
                children: {},
                parent: parent,
                name: name, 
            }
            newFolders[parent].children[id] = FolderIcon;
            return newFolders;
        });
      };
    
    const removeFolder = (id: string) => {
        setFolders(prevFolders => {
            if (!prevFolders[id]){
                // console.log(`Window does not exist with id: ${id}`)
                return prevFolders;
            }
            // console.log(`Window removed with id: ${id}`)
            const newTabs = {...prevFolders};
            const parentId = newTabs[id].parent;
            if (parentId) {
                delete newTabs[parentId].children[id];
            } else {
                console.log('parent id not found');
            }

            delete newTabs[id];
            return newTabs;
        })
    }

    const addApp = (id: string, component: React.ComponentType<any>, x_pos: number, y_pos: number) => {
        
    }

    return (
        <FileSystemContext.Provider value={{folders, addFolder, removeFolder, addApp}}>
            {children}
        </FileSystemContext.Provider>
    )
}

export {FileSystemContext, FileSystemProvider} 