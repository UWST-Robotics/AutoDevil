import React from "react";
import { TextField } from "@mui/material";

export interface PointTransformInputProps {
    value: number;
    label?: string;
    onChange: (value: number) => void;
}

export default function PointTransformInput(props: PointTransformInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    const onChange = React.useCallback((value: number, stringValue: string) => {
        setInputValue(stringValue);
        if (!isNaN(value) && value !== props.value)
            props.onChange(value);
    }, [props]);

    React.useEffect(() => {
        if (props.value !== parseFloat(inputValue))
            setInputValue(props.value.toString());
    }, [props, inputValue]);

    return (
        <TextField
            label={props.label}
            value={inputValue}
            onChange={(e) => onChange(parseFloat(e.target.value), e.target.value)}
            size={"small"}
        />
    );
}
