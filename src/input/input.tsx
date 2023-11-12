import { InputHTMLAttributes } from 'react';

import './input.css'

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>{
    label: string; 
    isError: boolean;
}

export const Input = ({ label, isError, ...inputProps }: InputProps) => {
    return (
        <>
            <label className={isError ? 'label_error' : ''}>{`${label}:`}</label>
            <input className={isError ? 'input_error' : ''} type="number" {...inputProps} />
        </>
    )
}
