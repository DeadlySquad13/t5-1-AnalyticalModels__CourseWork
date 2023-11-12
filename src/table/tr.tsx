import React from "react";

export interface TrProps<T> {
    label: string;
    values: T[];
    header: boolean;
    formatValue?: (value: T) => string;
}

export const Tr = (props: TrProps) => {
    return (
        <tr>
            {props.header ? <th>{props.label}</th> : <td>{props.label}</td>}
            {props.values.map((value) => {
                const formattedValue = !props.formatValue ? value : props.formatValue(value);

                return props.header ?<th>{formattedValue}</th> : <td>{formattedValue}</td>
            })}
        </tr>
    )
}
