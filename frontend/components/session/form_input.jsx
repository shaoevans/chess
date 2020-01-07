import React from "react";

const FormInput = ({type, str}) => {
    if (str === "") {
        if (type === "password") {
            return <input className="input-empty" type="password" />
        } else {
            return <input className="input-empty" type="text"/>
        }
    } else {

    }
}

export default FormInput