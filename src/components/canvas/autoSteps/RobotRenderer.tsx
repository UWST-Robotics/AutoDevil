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
    const {robotWidth, robotHeight, robotSafeRadius} = useSettingsValue();

    // Get Props
    const {color} = props;

    return (
        <>
            <Rect
                x={0}
                y={0}
                width={robotWidth}
                height={robotHeight}
                offsetX={robotWidth / 2}
                offsetY={robotHeight / 2}
                fill={"#00000000"}
                stroke={color ?? "#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * (props.strokeWidth ?? 1)}
                perfectDrawEnabled={false}
                shadowColor={"#000"}
                shadowBlur={10}
                shadowOpacity={0.5}
            />
            {props.showSafeRadius && (
                <Rect
                    x={0}
                    y={0}
                    width={(robotWidth + robotSafeRadius * 2)}
                    height={(robotHeight + robotSafeRadius * 2)}
                    offsetX={(robotWidth / 2 + robotSafeRadius)}
                    offsetY={(robotHeight / 2 + robotSafeRadius)}
                    fill={"#00000000"}
                    opacity={0.5}
                    stroke={color ? `${color}55` : "#fff55"}
                    strokeWidth={ROBOT_LINE_WIDTH}
                    perfectDrawEnabled={false}
                    dashEnabled={true}
                    dash={[1, 1]}
                />
            )}
            <Line
                points={[
                    0,
                    0,
                    robotWidth * (props.isFlipped ? -0.5 : 0.5),
                    0,
                ]}
                stroke={color ?? "#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * 3}
                perfectDrawEnabled={false}
            />
        </>
    )
}