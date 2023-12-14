export const formatLabel = (label: string) => {
    const labelParts = label.split('_')
    if (labelParts.length > 1) {
        return <>{labelParts[0]}<sub>{labelParts[1]}</sub></>
    }

    return `${label}`;
}
