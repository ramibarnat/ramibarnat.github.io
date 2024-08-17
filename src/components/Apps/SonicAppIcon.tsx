import BaseAppIcon from "./BaseAppIcon"
import sonic from '../../assets/App_Icons/sonic.png'
import { useContext } from "react";
import { TabContext } from "../Task Bar/TabContext";
import GameEmulator from "./GameEmulator";

interface RocketEmulatorIconProps {
    init_x: number,
    init_y: number,
}
function SonicAppIcon({init_x, init_y}: RocketEmulatorIconProps){
    const { addTab } = useContext(TabContext);
    
    const openApp = (id: string) => {
        addTab("Sonic", id, GameEmulator, {src: "https://archive.org/embed/arcade_mp_soni2", init_height: 515, init_width: 520})
    }

    return (
        <BaseAppIcon openApp={openApp} name={"Sonic"} init_x={init_x} init_y={init_y} app_img={sonic}/>
    )
}

export default SonicAppIcon