import { createContext, FC, ReactNode, useState } from "react"
import FolderIcon from "../Apps/FolderIcon"
import ProjectsAppIcon from "../Apps/ProjectsAppIcon";

interface FileChildrenType {
    children: Record<string, { component: React.ComponentType<any>, props: Record<string, any> }>,
    parent: string | null,
    name: string
}

interface FileSystemContextType {
    folders: Record<string,FileChildrenType>,   
    addFolder: (id: string, parent: string, name: string, props: any) => void,
    addApp: (id: string, parent: string, component: React.ComponentType<any>, props: any) => void,
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
        // Here we define the default structure of our file system
        {"root":
        {
            children: {"users": {component: FolderIcon, props:{init_x: 40, init_y: 40, id: "users"}}}, 
            parent: null, 
            name: "root"
        },
        "users": 
        {
            children: {"rami": {component: FolderIcon, props:{init_x: 40, init_y: 40, id: "rami"}}},
            parent: "root",
            name: "users"
        },
        "rami": 
        {
            children: {"desktop": {component: FolderIcon, props:{init_x: 40, init_y: 40, id: "desktop"}}},
            parent: "users",
            name: "Rami"
        },
        "desktop": 
        {
            children: {
                "projects": {component: ProjectsAppIcon, props:{init_x: 40, init_y: 40, id: "projects"}},
                "test": {component: FolderIcon, props:{init_x: 40, init_y: 140, id: "test"}}
        },
            parent: "rami",
            name: "Desktop"
        },
        "test": 
        {
            children: {"test2": {component: FolderIcon, props:{init_x: 40, init_y: 40, id: "test2"}}},
            parent: "desktop",
            name: "test"
        },
        "test2": 
        {
            children: {},
            parent: "test",
            name: "test2"
        },
        
        });
 
    const addFolder = (id: string, parent: string, name: string, props: any) => {
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
            // Add the new folder as a child of its parent
            newFolders[parent].children[id] = {component: FolderIcon, props:{init_x: props.init_x, init_y: props.init_y}};
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

    const addApp = (id: string, parent: string, component: React.ComponentType<any>, props: any) => {
        setFolders(prevFolders => {
            const newFolders = {...prevFolders}
            newFolders[parent].children[id] = {component: component, props: {init_x: props.init_x, init_y: props.init_y}};
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