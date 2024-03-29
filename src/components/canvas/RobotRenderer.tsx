import useSettingsValue from "../../hooks/Utils/useSettings.ts";
import { Line, Rect } from "react-konva";

interface RobotRendererProps {
    color?: string;
    isFlipped?: boolean;
    isSelected?: boolean;
}

const ROBOT_LINE_WIDTH = 0.5; // in

export default function RobotRenderer(props: RobotRendererProps) {
    const { pixelsPerInch, robotWidth, robotHeight } = useSettingsValue();

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
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch * (props.isSelected ? 1.5 : 1)}
                perfectDrawEnabled={false}
                shadowColor={"#000"}
                shadowBlur={props.isSelected ? 20 : 0}
                shadowOpacity={0.5}
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
                perfectDrawEnabled={false}
            />
        </>
    )
}