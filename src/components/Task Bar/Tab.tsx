import './Tab.css'

interface TabProps {
    name: string;
}
function Tab({name}: TabProps) {
    return (
        <div className="tab-container">
            <div>
                <p className='tab-title'>{name}</p>
            </div>
        </div>
    )
}

export default Tab