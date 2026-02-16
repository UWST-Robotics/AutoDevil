import React from "react";
import {Button, TextField} from "@mui/material";
import {useAutoData} from "../../../hooks/AutoData/useAutoData.ts";

export default function AutoNameEditor() {
    const [autoData, setAutoData] = useAutoData();
    const [isEditingName, setIsEditingName] = React.useState(false);
    const [name, setName] = React.useState(autoData.name);

    React.useEffect(() => {
        setName(autoData.name);
    }, [autoData]);

    React.useEffect(() => {
        if (!isEditingName)
            setAutoData({...autoData, name})
    }, [isEditingName]);

    if (!isEditingName) {
        return (
            <div className="map-name">
                <Button
                    style={{
                        fontWeight: 600,
                        textTransform: "none"
                    }}
                    size={"large"}
                    color={"inherit"}
                    onClick={() => setIsEditingName(true)}
                >
                    {autoData.name}
                </Button>
            </div>
        );
    } else {
        return (
            <div className="map-name">
                <TextField
                    autoFocus
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            setIsEditingName(false);
                    }}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    inputProps={{
                        maxLength: 32
                    }}
                />
            </div>
        );
    }
}