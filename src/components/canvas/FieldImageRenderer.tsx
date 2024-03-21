import { Image } from "react-konva";
import useFieldImage from "../../hooks/Field/useFieldImage.ts";

export default function FieldImageRenderer() {
    const fieldImage = useFieldImage();

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