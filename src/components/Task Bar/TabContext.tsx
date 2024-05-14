import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";

interface TabObject {
    name: string;
    id: string;
}

interface TabContextType {
    tabs: TabObject[],
    setTabs: Dispatch<SetStateAction<TabObject[]>>,
}

const TabContext = createContext<TabContextType>({
    tabs: [],
    setTabs: () => {},
});

interface ProviderProps {
    children: ReactNode
}

// FC is a functional component
const TabContextProvider: FC<ProviderProps> = ({children}) => {
    const [tabs, setTabs] = useState<TabObject[]>([]);

    return (
        <TabContext.Provider value={{tabs, setTabs}}>
            {children}
        </TabContext.Provider>
    )
}

export {TabContext, TabContextProvider} 