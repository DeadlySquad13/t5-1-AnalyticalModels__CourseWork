import { InputHTMLAttributes } from 'react';

import './input.css'
import { formatLabel } from '../utils';

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'step' | 'id'> {
    label?: string;
    isError: boolean;
    description?: string;
}

export const Input = ({ label, isError, description, ...inputProps }: InputProps) => {
    return (
        <>
            <div>
                <label className={isError ? 'label_error' : ''}>{formatLabel(label || inputProps.id || '')}:</label>
                <input className={isError ? 'input_error' : ''} type="number" {...inputProps} />
            </div>
            {description && <span>{description}</span>}
        </>
    )
}
