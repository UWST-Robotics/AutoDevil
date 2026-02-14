// import {useSelectedPointValue} from "../../hooks/Point/useSelectPoint.ts";
// import usePathPointValue from "../../hooks/Point/usePathPoint.ts";
// import {DEFAULT_GUID} from "../../utils/generateGUID.ts";
// import {List} from "@mui/material";
// import EventEditorPanel from "./EventEditorPanel.tsx";
// import {animated, useTransition} from "@react-spring/web";
//
// export default function EventsEditorPanel() {
//     const selectedPointID = useSelectedPointValue();
//     const point = usePathPointValue(selectedPointID ?? DEFAULT_GUID);
//     const transitions = useTransition(
//         point?.events?.map(e => e.id) ?? [],
//         {
//             from: {opacity: 0, transform: "translate3d(0,-40px,0)", maxHeight: 0},
//             enter: {opacity: 1, transform: "translate3d(0,0px,0)", maxHeight: 80},
//             leave: {opacity: 0, transform: "translate3d(0,-40px,0)", maxHeight: 0},
//         }
//     );
//
//     return (
//         <List>
//             {transitions((style, id) => (
//                 <animated.div
//                     key={id}
//                     style={style}
//                 >
//                     <EventEditorPanel
//                         eventID={id}
//                     />
//                 </animated.div>
//             ))}
//         </List>
//     )
// }