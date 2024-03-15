import React from "react";
import { Image } from "react-konva";
import { useSetWindowScale } from "../../hooks/Canvas/useWindowScale.ts";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";
import useFieldImage from "../../hooks/Field/useFieldImage.ts";

// Minimum padding around image
const IMAGE_PADDING = 110;

export default function FieldImageRenderer() {
    const [windowWidth, windowHeight] = useWindowSize();
    const setWindowScale = useSetWindowScale();
    const fieldImage = useFieldImage();

    // Set window scale
    React.useEffect(() => {
        if (fieldImage) {
            const scale = Math.min(
                (windowWidth - IMAGE_PADDING) / fieldImage.width,
                (windowHeight - IMAGE_PADDING) / fieldImage.height
            );
            setWindowScale(scale);
        }
    }, [fieldImage, windowWidth, windowHeight, setWindowScale]);

    return (
        <>
            {fieldImage && (
                <Image
                    image={fieldImage}
                    x={-fieldImage.width / 2}
                    y={-fieldImage.height / 2}
                    width={fieldImage.width}
                    height={fieldImage.height}
                    isListening={false}
                />
            )}
        </>
    )
}