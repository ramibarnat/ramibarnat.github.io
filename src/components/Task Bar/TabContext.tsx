import { FC, ReactNode, createContext, useState } from "react";

interface TabConfig {
    name: string,
    component: React.ComponentType<any>,
    props?: any,
}

interface TabContextType {
    tabs: Record<string,TabConfig>,
    // setTabs: Dispatch<SetStateAction<Record<string,TabConfig>>>,

    // We use addTab to ensure that no duplicate tabs are created
    // React.ComponentType is used bc it's more flexible than React.Component 
    addTab: (name: string, id: string, component: React.ComponentType<any>, props?: any) => void,

    removeTab: (id:string) => void,
}

const TabContext = createContext<TabContextType>({
    tabs: {},
    addTab: () => {},
    removeTab: () => {},
});

interface ProviderProps {
    children: ReactNode
}

// FC is a functional component
const TabContextProvider: FC<ProviderProps> = ({children}) => {
    const [tabs, setTabs] = useState<Record<string,TabConfig>>({});
    const addTab = (name: string, id: string, component: React.ComponentType<any>, props?: any) => {
        setTabs(prevTabs => {
          if (prevTabs[id]) {
            // ID already exists, so do not add
            return prevTabs;
          }

          // ID does not exist, add it to tabs
          return {
            ...prevTabs,
            [id]: { name: name, component: component, props: props}
          };
        });
      };
    
    const removeTab = (id: any) => {
        setTabs(prevTabs => {
            if (!prevTabs[id.id]){
                // console.log(`Window does not exist with id: ${id.id}`)
                return prevTabs;
            }
            // console.log(`Window removed with id: ${id.id}`)
            const newTabs = {...prevTabs}
            delete newTabs[id.id]
            return newTabs
        })
    }

    return (
        <TabContext.Provider value={{tabs, addTab, removeTab}}>
            {children}
        </TabContext.Provider>
    )
}

export {TabContext, TabContextProvider} 