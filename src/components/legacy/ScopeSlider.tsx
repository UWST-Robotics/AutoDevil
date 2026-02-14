// import useScope from "../../hooks/Scope/useScope.ts";
// import Slider from "@mui/material/Slider";
// import React from "react";
//
// export default function ScopeSlider() {
//     const [scope, setScope] = useScope();
//     const path = usePathValue();
//
//     const onChange = React.useCallback((_: Event, newValue: number | number[]) => {
//         if (typeof newValue === "number")
//             return;
//         setScope({
//             start: newValue[0],
//             end: newValue[1]
//         });
//     }, [setScope]);
//
//
//     return (
//         <Slider
//             getAriaValueText={(value) => `${value * 100}%`}
//             valueLabelDisplay={"off"}
//             value={[scope.start, scope.end]}
//             min={0}
//             max={1}
//             step={1 / (path.points.length - 1)}
//             onChange={onChange}
//             style={{ width: 300, marginLeft: 16, marginRight: 16 }}
//         />
//     )
// }