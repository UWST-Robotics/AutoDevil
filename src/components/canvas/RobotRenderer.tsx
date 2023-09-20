import useSettingsValue from "../../hooks/useSettings.tsx";
import { Line, Rect } from "react-konva";

const ROBOT_LINE_WIDTH = 0.5; // in

export default function RobotRenderer() {
    const { pixelsPerInch, robotWidth, robotHeight } = useSettingsValue();

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
                stroke={"#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch}
            />
            <Line
                points={[
                    0,
                    0,
                    0,
                    robotHeight * pixelsPerInch * 0.4,
                ]}
                stroke={"#fff"}
                strokeWidth={ROBOT_LINE_WIDTH * pixelsPerInch}
            />
        </>
    )
}