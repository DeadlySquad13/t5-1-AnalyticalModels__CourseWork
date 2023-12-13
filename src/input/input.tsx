import { InputHTMLAttributes } from 'react';

import './input.css'

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'step'> {
    label: string;
    isError: boolean;
    description?: string;
}

export const Input = ({ label, isError, description, ...inputProps }: InputProps) => {
    return (
        <>
            <div>
                <label className={isError ? 'label_error' : ''}>{`${label}:`}</label>
                <input className={isError ? 'input_error' : ''} type="number" {...inputProps} />
            </div>
            {description && <span>{description}</span>}
        </>
    )
}
