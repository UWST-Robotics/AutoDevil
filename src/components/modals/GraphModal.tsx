import { Callout, Dialog, DialogBody } from "@blueprintjs/core";
import { Chart } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip, } from 'chart.js';
import usePathSpline from "../../hooks/Path/usePathSpline.ts";
import React from "react";
import useGetAnimState from "../../hooks/Canvas/useGetAnimState.ts";

interface GraphModalProps {
    isOpen: boolean;
    onClose: () => void;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DELTA_T = 0.02;

export default function GraphModal(props: GraphModalProps) {
    const spline = usePathSpline(DELTA_T);
    const getAnimState = useGetAnimState();

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
        const data = Array.from({ length: spline.length / DELTA_T }, (_, t) => ({
            x: t * DELTA_T,
            y: (spline.velocityAt(t * DELTA_T) ?? 0) * (getAnimState(t * DELTA_T).isReversed ? -1 : 1),
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
    }, [spline, getAnimState]);

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