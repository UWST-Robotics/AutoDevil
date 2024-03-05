import useSettingsValue, { DEFAULT_SETTINGS } from "../../hooks/useSettings.ts";
import { Line, Rect } from "react-konva";

interface RobotRendererProps {
    color?: string;
    isFlipped?: boolean;
}

const ROBOT_LINE_WIDTH = 0.5; // in

export default function RobotRenderer(props: RobotRendererProps) {
    const settings = useSettingsValue();

    // Get Settings
    const pixelsPerInch = settings.pixelsPerInch ?? DEFAULT_SETTINGS.pixelsPerInch ?? 0;
    const robotWidth = settings.robotWidth ?? DEFAULT_SETTINGS.robotWidth ?? 0;
    const robotHeight = settings.robotHeight ?? DEFAULT_SETTINGS.robotHeight ?? 0;

    // Get Props
    const { color } = props;

    return (
        <>
            <Rect
                x={0}
                y={0}
                width={robotWidth * pixelsPerInch}
                height={robotHeight * pixelsPerInch}
                offsetX={robotWidth / 2 * pixelsPerInch}
                offsetY={robotHeight / 2 * pixelsPerInch}
                fill={"#00000000"}
                stroke={color ?? "#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch}
            />
            <Line
                points={[
                    0,
                    0,
                    robotHeight * pixelsPerInch * (props.isFlipped ? -0.5 : 0.5),
                    0,
                ]}
                stroke={color ?? "#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch * 3}
            />
        </>
    )
}