import { Callout, Dialog, DialogBody } from "@blueprintjs/core";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import React from "react";

interface GraphModalProps {
    isOpen: boolean;
    onClose: () => void;
}

ChartJS.register(...registerables);

const DELTA_T = 0.02;

export default function GraphModal(props: GraphModalProps) {
    const spline = usePathSpline(DELTA_T);

    const options = React.useMemo<any>(() => ({
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            intersect: true,
            mode: "nearest",
        },
        scales: {
            y: {
                type: 'linear',
                position: 'bottom',
                suggestedMin: 30,
            }
        }
    }), []);

    const data = React.useMemo<any>(() => {
        const getIsReversed = (i: number) => spline.path.points[Math.floor(i)].state?.isReversed ?? false;
        const data = Array.from({ length: spline.length / DELTA_T }, (_, t) => ({
            x: t * DELTA_T,
            y: (spline.velocityAt(t * DELTA_T) ?? 0) * (getIsReversed(t * DELTA_T) ? -1 : 1),
        }));
        return {
            datasets: [
                {
                    label: "Velocity (in/s) [F]",
                    data: data.filter(p => p.y > 0),
                    borderColor: "rgba(128, 255, 128, 1)",
                    backgroundColor: "rgba(128, 255, 128, 0.5)",
                },
                {
                    label: "Velocity (in/s) [R]",
                    data: data.filter(p => p.y < 0),
                    borderColor: "rgba(255, 128, 128, 1)",
                    backgroundColor: "rgba(255, 128, 128, 0.5)",
                }
            ]
        }
    }, [spline]);

    return (
        <Dialog
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={"Velocity Curve"}
            icon={"timeline-line-chart"}
        >
            <DialogBody>
                <Chart
                    type={"scatter"}
                    data={data}
                    options={options}
                    style={{
                        maxHeight: 300,
                    }}
                />
                <Callout
                    intent={"primary"}
                    title={"Note"}
                    style={{
                        marginTop: 10,
                    }}
                >
                    You should try to minimize any gaps between line segments in the path to ensure the robot
                    isn't experiencing any sudden changes in acceleration.
                </Callout>
            </DialogBody>
        </Dialog>
    )
}