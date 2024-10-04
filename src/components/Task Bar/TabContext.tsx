import { FC, ReactNode, createContext, useState } from "react";

interface TabConfig {
    name: string,
    component: React.ComponentType<any>,
    focused: boolean,
    image: string,
    props?: any,
}

interface TabContextType {
    tabs: Record<string,TabConfig>,

    // We use addTab to ensure that no duplicate tabs are created
    // React.ComponentType is used bc it's more flexible than React.Component 
    addTab: (name: string, id: string, component: React.ComponentType<any>, image: string, props?: any) => void,
    removeTab: (id:string) => void,
    setFocus: (id:string) => void,
    changeTabName: (id: string, new_name: string) => void,
    focusedTab: string,

    // This will keep track of the item currently being dragged
    itemDraggedID: string | null, 
    setItemDraggedID: (id: string | null) => void,
}

const TabContext = createContext<TabContextType>({
    tabs: {},
    addTab: () => {},
    removeTab: () => {},
    setFocus: () => {},
    changeTabName: () => {},
    focusedTab: "",
    itemDraggedID: null,
    setItemDraggedID: () => {},
});

interface ProviderProps {
    children: ReactNode
}

// FC is a functional component
const TabContextProvider: FC<ProviderProps> = ({children}) => {
    const [tabs, setTabs] = useState<Record<string,TabConfig>>({});
    const [focusedTab, setFocusedTab] = useState<string>("");
    const [itemDraggedID, setItemDraggedID] = useState<string | null>(null);
 
    const addTab = (name: string, id: string, component: React.ComponentType<any>, image: string, props?: any) => {
        setTabs(prevTabs => {
            const newTabs = {...prevTabs};
            if (newTabs[focusedTab]) {
                newTabs[focusedTab].focused = false;
            }
            setFocusedTab(id); // focuses the tab that was just added
            newTabs[id] = {
                name: name, 
                component: component, 
                focused: true, 
                image: image, 
                props: props
            }
            return newTabs;
        });
      };
    
    const removeTab = (id: string) => {
        setTabs(prevTabs => {
            if (!prevTabs[id]){
                // console.log(`Window does not exist with id: ${id}`)
                return prevTabs;
            }
            // console.log(`Window removed with id: ${id}`)
            const newTabs = {...prevTabs};
            delete newTabs[id];
            return newTabs;
        })
    }

    const setFocus = (id: string) => {
        setTabs(prevTabs => {
            if (!prevTabs[id]){
                return prevTabs;
            }
            const newTabs = {...prevTabs};

            if (newTabs[focusedTab]) {
                newTabs[focusedTab].focused = false;
            }
            newTabs[id].focused = true;
            setFocusedTab(id)
            return newTabs;
        })
    }

    const changeTabName = (id: string, new_name: string) => {
        setTabs(prevTabs => {
            if (!prevTabs[id]) {
                return prevTabs;
            }
            const newTabs = {...prevTabs};

            newTabs[id].name = new_name;
            return newTabs;
        })
    }

    return (
        <TabContext.Provider value={{tabs, addTab, removeTab, focusedTab, setFocus, changeTabName, itemDraggedID, setItemDraggedID}}>
            {children}
        </TabContext.Provider>
    )
}

export {TabContext, TabContextProvider} 