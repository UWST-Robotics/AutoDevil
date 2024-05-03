import React from "react";
import { TextField } from "@mui/material";

export interface PointTransformInputProps {
    value: number;
    label?: string;
    onChange: (value: number) => void;
    isEqual?: (a: number, b: number) => boolean;
}

export default function PointTransformInput(props: PointTransformInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    // Equality check for custom isEqual function
    const isEqual = React.useCallback((a: number, b: number) => {
        if (props.isEqual)
            return props.isEqual(a, b);
        return a === b;
    }, [props.isEqual]);

    // Update state when form changes
    const onChange = React.useCallback((stringValue: string) => {
        // Update input value
        setInputValue(stringValue);

        // Parse number
        const numValue = parseFloat(stringValue);
        if (!isNaN(numValue) && !isEqual(numValue, props.value))
            props.onChange(numValue);
    }, [props, isEqual]);

    // Update form when state changes
    React.useEffect(() => {
        setInputValue(value => {
            if (!isEqual(parseFloat(value), props.value))
                return props.value.toString();
            return value;
        });
    }, [props.value]);

    return (
        <TextField
            label={props.label}
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            color={"primary"}
            size={"small"}
        />
    );
}
