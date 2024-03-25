import { Group, Image, Text } from 'react-konva';
import useFieldImage from "../../hooks/Field/useFieldImage.ts";
import React from "react";

const WATERMARK_WIDTH = 500;
const WATERMARK_OFFSET_X = 100;
const WATERMARK_OFFSET_Y = 50;
const WATERMARK_SCALE = 1.3;
const LOGO_SCALE = 0.5;
const LOGO_URL = "/android-chrome-512x512.png";

export default function WatermarkRenderer() {
    const fieldImage = useFieldImage();
    const [logoImage, setLogoImage] = React.useState<HTMLImageElement | undefined>(undefined);
    const [hasQuery, setHasQuery] = React.useState<boolean>(false);

    // Load the logo image
    React.useEffect(() => {
        const image = new window.Image();
        image.src = LOGO_URL;
        image.onload = () => {
            setLogoImage(image);
        }
    }, []);

    // Check for ?watermark query parameter
    React.useEffect(() => {
        if (window.location.search.includes("watermark")) {
            setHasQuery(true);
        }
    }, []);


    // If there is no field image, return null
    if (!fieldImage || !logoImage || !hasQuery)
        return null;

    const logoWidth = WATERMARK_WIDTH * LOGO_SCALE;
    const logoHeight = logoImage.height * WATERMARK_WIDTH / logoImage.width * LOGO_SCALE;

    return (
        <Group
            opacity={0.3}
            scaleX={WATERMARK_SCALE}
            scaleY={WATERMARK_SCALE}
            x={-fieldImage.width - WATERMARK_OFFSET_X}
            y={WATERMARK_OFFSET_Y}
        >
            <Image
                image={logoImage}
                x={logoWidth / 2}
                y={-logoHeight / 2 - 100}
                width={logoWidth}
                height={logoHeight}
                perfectDrawEnabled={false}
                isListening={false}
            />
            <Text
                text={"AutoDevil"}
                x={0}
                y={0}
                fontSize={48}
                fontFamily={"Righteous"}
                width={WATERMARK_WIDTH}
                fill={"#ffffff"}
                align={"center"}
            />
            <Text
                text={"Made w/ ❤ by DevilBots"}
                x={0}
                y={48}
                fontSize={20}
                fontFamily={"Righteous"}
                width={WATERMARK_WIDTH}
                fill={"#0b74b8"}
                align={"center"}
            />
            <Text
                text={`Auto.DevilBots.org · v${APP_VERSION}`}
                x={0}
                y={72}
                fontSize={16}
                fontFamily={"Righteous"}
                width={WATERMARK_WIDTH}
                fill={"#bbb"}
                align={"center"}
            />
        </Group>
    )
}