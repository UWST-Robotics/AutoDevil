import {Image} from "react-konva";
import useFieldImage from "../../hooks/Field/useFieldImage.ts";
import useSettingsValue from "../../hooks/Utils/useSettings.ts";

export default function FieldImageRenderer() {
    const fieldImage = useFieldImage();
    const {fieldOpacity, pixelsPerInch} = useSettingsValue();

    if (!fieldImage)
        return null;

    const fieldWidth = fieldImage.width / pixelsPerInch; // px
    const fieldHeight = fieldImage.height / pixelsPerInch; // px

    return (
        <Image
            image={fieldImage}
            x={-fieldWidth / 2}
            y={-fieldHeight / 2}
            width={fieldWidth}
            height={fieldHeight}
            opacity={fieldOpacity}
            perfectDrawEnabled={false}
            isListening={false}
        />
    )
}