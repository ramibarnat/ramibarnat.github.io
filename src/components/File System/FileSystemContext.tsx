import { createContext, FC, ReactNode, useState } from "react"
import FolderIcon from "../Apps/FolderIcon"

interface FileChildrenType {
    children: Record<string, { component: React.ComponentType<any>, props: Record<string, any> }>,
    parent: string | null,
    name: string
}

interface FileSystemContextType {
    folders: Record<string,FileChildrenType>,   
    addFolder: (id: string, parent: string, name: string) => void,
    addApp: (id: string, parent: string, component: React.ComponentType<any>) => void,
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


const FileSystemContextProvider: FC<ProviderProps> = ({children}) => {
    const [folders, setFolders] = useState<Record<string,FileChildrenType>>(
        {"root":
        {
            children: {"123456788": {component: FolderIcon, props:{init_x: 40, init_y: 40}}}, 
            parent: null, 
            name: "root"
        },
        "users": 
        {
            children: {"123456787": FolderIcon},
            parent: "123456789",
            name: "users"
        },
        "rami": 
        {
            children: {"123456786": FolderIcon},
            parent: "123456788",
            name: "Rami"
        },
        "desktop": 
        {
            children: {},
            parent: "123456787",
            name: "Desktop"
        },
        
        });
 
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
            console.log(newFolders);
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
            const newFolders = {...prevFolders};
            const parentId = newFolders[id].parent;
            if (parentId) {
                delete newFolders[parentId].children[id];
            } else {
                console.log('parent id not found');
            }

            delete newFolders[id];
            return newFolders;
        })
    }

    const addApp = (id: string, parent: string, component: React.ComponentType<any>) => {
        setFolders(prevFolders => {
            const newFolders = {...prevFolders}
            newFolders[parent].children[id] = component;
            return newFolders;
        })
    }

    return (
        <FileSystemContext.Provider value={{folders, addFolder, removeFolder, addApp}}>
            {children}
        </FileSystemContext.Provider>
    )
}

export {FileSystemContext, FileSystemContextProvider} 