export interface TrProps<T> {
    label: string;
    values: T[];
    header?: boolean;
    formatValue?: (value: T) => string;
    description: string;
}

export const Tr = <T,>(props: TrProps<T>) => {
    return (
        <tr>
            {props.description && <td>{props.description}</td>}
            {props.header ? <th>{props.label}</th> : <td>{props.label}</td>}
            {props.values.map((value, i) => {
                const formattedValue = !props.formatValue ? String(value) : props.formatValue(value);

                return props.header ? <th key={`${props.label}-${i}`}>{formattedValue}</th> : <td key={`${props.label}-${i}`}>{formattedValue}</td>
            })}
        </tr>
    )
}
