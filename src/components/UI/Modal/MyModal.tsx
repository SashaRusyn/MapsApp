import React, { FC, MouseEvent, ReactNode } from "react";
import classes from "./MyModal.module.scss";
import { useDispatch } from "react-redux";

interface MyModalProps {
    type: string;
    visible: boolean;
    children: ReactNode;
}

const MyModal: FC<MyModalProps> = ({ children, visible, type }) => {
    const rootClasses = [classes.myModal];

    if (visible) {
        rootClasses.push(classes.active);
    }
    const dispatch = useDispatch();

    return (
        <div className={rootClasses.join(' ')} onClick={() => dispatch({ type: type, payload: false })}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;