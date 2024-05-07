import { CSSProperties, ChangeEvent, FC, MouseEvent, ReactNode } from "react";
import classes from "./MySelect.module.scss";
import { setOptions } from "leaflet";

interface MySelectProps {
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    options: any[];
    value: any;
    unit?: string;
    setOption: (event: ChangeEvent<HTMLSelectElement>) => void;
    children?: ReactNode;
}

const MySelect: FC<MySelectProps> = ({ options, value, setOption, unit, position }) => {
    const buttonStyle: CSSProperties = {
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right
    };

    return (
        <select className={classes.mySelect} style={buttonStyle} value={value} onChange={setOption}>
            {options.map(element =>
                <option key={element} value={element}>{element} {unit}</option>
            )}
        </select>
    )
}

export default MySelect;