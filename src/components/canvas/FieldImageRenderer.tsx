import useSettingsValue from "../../hooks/useSettings.ts";
import React from "react";
import { Image } from "react-konva";
import { useSetWindowScale } from "../../hooks/Canvas/useWindowScale.ts";
import useWindowSize from "../../hooks/Canvas/useWindowSize.ts";

// Minimum padding around image
const IMAGE_PADDING = 110;

export default function FieldImageRenderer() {
    const settings = useSettingsValue();
    const [windowWidth, windowHeight] = useWindowSize();
    const setWindowScale = useSetWindowScale();
    const [image, setImage] = React.useState<HTMLImageElement | undefined>(undefined);

    // Field Image
    const fieldImageURL = settings.fieldImage ?? "/default-field.png";

    // Load Image
    React.useEffect(() => {
        const img = new window.Image();
        img.src = fieldImageURL;
        img.onload = () => {
            setImage(img);
        };
        img.onerror = () => {
            setImage(undefined);
        }
    }, [fieldImageURL]);

    // Set window scale
    React.useEffect(() => {
        if (image) {
            const scale = Math.min(
                (windowWidth - IMAGE_PADDING) / image.width,
                (windowHeight - IMAGE_PADDING) / image.height
            );
            setWindowScale(scale);
        }
    }, [image, windowWidth, windowHeight, setWindowScale]);

    return (
        <>
            {image && (
                <Image
                    image={image}
                    x={-image.width / 2}
                    y={-image.height / 2}
                    width={image.width}
                    height={image.height}
                    isListening={false}
                />
            )}
        </>
    )
}