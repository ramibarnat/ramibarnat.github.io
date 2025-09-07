import BaseAppIcon from "./BaseAppIcon"
import sonic from '../../assets/App_Icons/sonic.png'
import { useContext } from "react";
import { TabContext } from "../task-bar/TabContext";
import GameEmulator from "./GameEmulator";

interface RocketEmulatorIconProps {
    init_x: number,
    init_y: number,
    id: string,
}
function SonicAppIcon({init_x, init_y, id}: RocketEmulatorIconProps){
    const { addTab } = useContext(TabContext);
    
    const openApp = () => {
        addTab("Sonic", id, GameEmulator, sonic, {src: "https://archive.org/embed/arcade_mp_soni2", init_height: 515, init_width: 520})
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Sonic"} init_x={init_x} init_y={init_y} app_img={sonic} app_id={id}/>
    )
}

export default SonicAppIcon