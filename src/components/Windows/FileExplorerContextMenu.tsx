import ContextMenu from "./ContextMenu"


function FileExplorerContextMenu({x_pos, y_pos, removeContextMenu}: {x_pos: number, y_pos: number, removeContextMenu: () => void }) {

    return (
        <ContextMenu  x_pos={x_pos} y_pos={y_pos} removeContextMenu={removeContextMenu}/>
    )
}

export default FileExplorerContextMenu