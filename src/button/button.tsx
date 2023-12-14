import { MouseEvent, ReactNode } from "react";
import './button.css';

export interface ButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode
}

export const Button = (props: ButtonProps) => {
    return <button className="button" {...props} />
}

