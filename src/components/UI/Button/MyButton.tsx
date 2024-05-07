import { CSSProperties, FC, MouseEvent, ReactNode } from "react";
import classes from './MyButton.module.scss';

interface MyButtonProps {
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    onclick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

const MyButton: FC<MyButtonProps> = ({ position, onclick, children }) => {
    const buttonStyle: CSSProperties = {
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right
    };

    return (
        <button className={classes.myButton} style={buttonStyle} onClick={onclick}>
            {children}
        </button>
    )
}

export default MyButton;