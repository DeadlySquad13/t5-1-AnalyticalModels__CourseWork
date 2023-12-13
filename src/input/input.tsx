import { InputHTMLAttributes } from 'react';

import './input.css'

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'step' | 'id'> {
    label?: string;
    isError: boolean;
    description?: string;
}

const formatLabel = (label: string) => {
    const labelParts = label.split('_')
    if (labelParts.length > 1) {
        return <>{labelParts[0]}<sub>{labelParts[1]}</sub>:</>
    }

    return `${label}:`;
}

export const Input = ({ label, isError, description, ...inputProps }: InputProps) => {
    return (
        <>
            <div>
                <label className={isError ? 'label_error' : ''}>{formatLabel(label || inputProps.id || '')}</label>
                <input className={isError ? 'input_error' : ''} type="number" {...inputProps} />
            </div>
            {description && <span>{description}</span>}
        </>
    )
}
