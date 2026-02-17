import useSettingsValue from "../../../hooks/Utils/useSettings.ts";
import {Line, Rect} from "react-konva";

interface RobotRendererProps {
    color?: string;
    isFlipped?: boolean;
    strokeWidth?: number;
    showSafeRadius?: boolean;
}

const ROBOT_LINE_WIDTH = 0.5; // in

export default function RobotRenderer(props: RobotRendererProps) {
    const {pixelsPerInch, robotWidth, robotHeight, robotSafeRadius} = useSettingsValue();

    // Get Props
    const {color} = props;

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
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch * (props.strokeWidth ?? 1)}
                perfectDrawEnabled={false}
                shadowColor={"#000"}
                shadowBlur={10}
                shadowOpacity={0.5}
            />
            {props.showSafeRadius && (
                <Rect
                    x={0}
                    y={0}
                    width={(robotWidth + robotSafeRadius * 2) * pixelsPerInch}
                    height={(robotHeight + robotSafeRadius * 2) * pixelsPerInch}
                    offsetX={(robotWidth / 2 + robotSafeRadius) * pixelsPerInch}
                    offsetY={(robotHeight / 2 + robotSafeRadius) * pixelsPerInch}
                    fill={"#00000000"}
                    opacity={0.5}
                    stroke={color ? `${color}55` : "#fff55"}
                    strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch}
                    perfectDrawEnabled={false}
                    dashEnabled={true}
                    dash={[10, 10]}
                />
            )}
            <Line
                points={[
                    0,
                    0,
                    robotWidth * pixelsPerInch * (props.isFlipped ? -0.5 : 0.5),
                    0,
                ]}
                stroke={color ?? "#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch * 3}
                perfectDrawEnabled={false}
            />
        </>
    )
}