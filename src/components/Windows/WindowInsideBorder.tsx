import WindowComponent from "./WindowComponent"
import './WindowsInsideBorder.css'

interface WindowInsideBorderProps {
    id: string,
    children?: any,
    init_width?: number,
    init_height?: number,
    init_x?: number,
    init_y?: number,
}

function WindowInsideBorder({id, children, init_width, init_height, init_x, init_y}: WindowInsideBorderProps) {

    return (
        <WindowComponent id={id} init_height={init_height} init_width={init_width} init_x={init_x} init_y={init_y}>
            <div className="window-inside-border">
                <div className="window-inner-inside-border">
                    <div className="window-inside-border-body">
                        {children}
                    </div>
                </div>
            </div>
        </WindowComponent>
    )
}

export default WindowInsideBorder