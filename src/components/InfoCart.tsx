import React from "react";
import { capitalize, join_address } from "../utils/info";

const InfoCart = (props: any) => {
    return (
        <div>
            <p>{capitalize(props.type).replace("_", " ")}{props.tags.name ? ":" : null} {props.tags.name ? <strong> {props.tags.name}</strong> : null}</p>
            <p>{join_address([props.tags["addr:street"], props.tags["addr:housenumber"]])}</p>
        </div>
    );
}

export default InfoCart;