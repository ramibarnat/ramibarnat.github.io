import { useContext } from 'react';
import './Tab.css'
import { TabContext } from './TabContext';

function Tab({name, image, id}: {name: string, image: string, id: string}) {
    const { tabs, setFocus } = useContext(TabContext);    

    const charLimit = 16;

    if (name.length >= charLimit) {
        name = name.slice(0,charLimit+1).trimEnd() + '...'
    }

    const handleClick = () => {
        setFocus(id);
    }

    return (
        <div onClick={handleClick} className={tabs[id].focused ? "tab-container-focused": "tab-container"}>
            <img className="tab-image" src={image}/>
            <p className='tab-title'>{name}</p>
        </div>
    )
}

export default Tab