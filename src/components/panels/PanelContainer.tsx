import React from "react";
import {Button, Card, CardContent, Collapse, Typography} from "@mui/material";
import AnimatedCaretIcon from "../common/AnimatedCaretIcon.tsx";
import ErrorBoundary from "../common/ErrorBoundary.tsx";

interface PanelContainerProps {
    children?: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
}

export default function PanelContainer(props: PanelContainerProps) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <Card
            elevation={1}
            sx={{
                padding: 0,
                marginTop: 1,
                boxShadow: "none",
                borderRadius: 3,
                pointerEvents: "auto",
            }}
        >
            <Button
                fullWidth
                endIcon={<AnimatedCaretIcon up={!isOpen}/>}
                size={"large"}
                onClick={() => setIsOpen(!isOpen)}
                style={{fontWeight: 600}}
            >
                {props.title}
            </Button>
            <Collapse in={isOpen}>
                <CardContent sx={{paddingTop: 1, paddingBottom: 1}}>
                    <ErrorBoundary fallback={
                        <Typography
                            variant={"body2"}
                            color={"textSecondary"}
                            sx={{textAlign: "center"}}
                        >
                            Error loading step, <br/>
                            see console for more details
                        </Typography>
                    }
                    >
                        {props.children}
                    </ErrorBoundary>
                </CardContent>
            </Collapse>
        </Card>
    );
}
