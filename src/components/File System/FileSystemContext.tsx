import { createContext, FC, ReactNode, useState } from "react"
import FolderIcon from "../Apps/FolderIcon"
import ProjectsAppIcon from "../Apps/ProjectsAppIcon";
import RocketEmulatorIcon from "../Apps/RocketEmulatorIcon";
import SonicAppIcon from "../Apps/SonicAppIcon";

interface FileChildrenType {
    children: Record<string, { component: React.ComponentType<any>, props: Record<string, any> }>,
    parent: string | null,
    name: string
}

interface FileSystemContextType {
    folders: Record<string,FileChildrenType>,   
    addFolder: (id: string, parent: string, name: string, props: any) => void,
    addApp: (id: string, parent: string, component: React.ComponentType<any>, props: any) => void,
    removeFolder: (id: string) => void,
    moveApp: (id: string, new_parent: string) => void,
}

const FileSystemContext = createContext<FileSystemContextType>({
    folders: {},
    addFolder: () => {},
    addApp: () => {},
    removeFolder: () => {},
    moveApp: () => {},
});

interface ProviderProps {
    children: ReactNode
}


const FileSystemContextProvider: FC<ProviderProps> = ({children}) => {
    const [folders, setFolders] = useState<Record<string,FileChildrenType>>(
        // Here we define the default structure of our file system
        {"root":
        {
            children: {"users": {component: FolderIcon, props:{init_x: 40, init_y: 40}}}, 
            parent: null, 
            name: "root"
        },
        "users": 
        {
            children: {"rami": {component: FolderIcon, props:{init_x: 40, init_y: 40}}},
            parent: "root",
            name: "users"
        },
        "rami": 
        {
            children: {"desktop": {component: FolderIcon, props:{init_x: 40, init_y: 40}}},
            parent: "users",
            name: "Rami"
        },
        "desktop": 
        {
            children: {
                "projects": {component: ProjectsAppIcon, props:{init_x: 40, init_y: 40}},
                "rocket-emulator": {component: RocketEmulatorIcon, props:{init_x: 40, init_y: 140}},
                "sonic": {component: SonicAppIcon, props:{init_x: 40, init_y: 280}},
                "folder": {component: FolderIcon, props:{init_x: 40, init_y: 375}}
        },
            parent: "rami",
            name: "Desktop"
        },
        "folder": 
        {
            children: {"test2": {component: FolderIcon, props:{init_x: 40, init_y: 40}}},
            parent: "desktop",
            name: "Folder"
        },
        "projects": // Although this is an App and not a folder, we still need to be able to look up its parent
        {
            children: {},
            parent: "desktop",
            name: "Projects"
        },
        "rocket-emulator":
        {
            children: {},
            parent: "desktop",
            name: "Rocket Simulator (WIP)"
        },
        "sonic":
        {
            children: {},
            parent: "desktop",
            name: "Sonic"
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
            newFolders[parent].children[id] = {component: FolderIcon, props:{init_x: props.init_x, init_y: props.init_y, id: id}};
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
            if (parentId && newFolders[parentId]) {
                delete newFolders[parentId].children[id];
            } else {
                console.log('parent id not found');
            }

            delete newFolders[id];
            return newFolders;
        })
    }

    const moveApp = (id: string, new_parent: string) => {
        setFolders(prevFolders => {
            if (!prevFolders[id]) {
                console.log(`App does not exist with id: ${id}`);
                return prevFolders;
            }
            const newFolders = {...prevFolders};
            const parentId = newFolders[id].parent;
            if (parentId && newFolders[parentId]) {
                if (newFolders[parentId].children[id]){
                    delete newFolders[parentId].children[id]
                    if (newFolders[new_parent]) {
                        // newFolders[new_parent].children[id] = 
                        return;
                    }
                } else {
                    console.log(`App not found in parent's children`);
                    return prevFolders;
                }
            } else {
                console.log('Parent ID not found');
                return prevFolders;
            }
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