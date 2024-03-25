import { Image } from "react-konva";
import useFieldImage from "../../hooks/Field/useFieldImage.ts";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

export default function FieldImageRenderer() {
    const fieldImage = useFieldImage();
    const { fieldOpacity } = useSettingsValue();

    if (!fieldImage)
        return null;

    return (
        <Image
            image={fieldImage}
            x={-fieldImage.width / 2}
            y={-fieldImage.height / 2}
            width={fieldImage.width}
            height={fieldImage.height}
            opacity={fieldOpacity}
            perfectDrawEnabled={false}
            isListening={false}
        />
    )
}