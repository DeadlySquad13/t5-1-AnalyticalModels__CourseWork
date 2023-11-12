import React from "react"

export interface InputProps {
    label: string; 
    type: "number";
    value: number | string;
    onChange: (e) => void;
}

export const Input = ({ label, ...inputProps }: InputProps) => {
    return (
        <>
            <label>{`${label}:`}</label>
            <input {...inputProps} />
        </>
    )
}
