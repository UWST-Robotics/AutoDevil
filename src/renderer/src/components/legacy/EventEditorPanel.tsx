// import GUID from "../../types/GUID.ts";
// import {useSelectedPointValue} from "../../hooks/Point/useSelectPoint.ts";
// import {usePathPoint} from "../../hooks/Point/usePathPoint.ts";
// import {DEFAULT_GUID} from "../../utils/generateGUID.ts";
// import React from "react";
// import makeAlphanumeric from "../../utils/makeAlphanumeric.ts";
// import {Autocomplete, IconButton, ListItem, TextField} from "@mui/material";
// import useRawAutoDataValue from "../../hooks/AutoData/useAutoData.ts";
// import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
//
// interface EventEditorPanelProps {
//     eventID?: GUID;
// }
//
// export default function EventEditorPanel(props: EventEditorPanelProps) {
//     const selectedPointID = useSelectedPointValue();
//     const [point, setPoint] = usePathPoint(selectedPointID ?? DEFAULT_GUID);
//     const rawPath = useRawAutoDataValue();
//
//     // Get Event
//     const event = point?.events?.find(e => e.id === props.eventID);
//
//     // Get Event Names
//     const eventNames = React.useMemo(() => {
//         const names = new Set<string>();
//         rawPath?.points.forEach(p => {
//             p.events?.forEach(e => {
//                 names.add(e.name);
//             });
//         });
//         return Array.from(names);
//     }, [rawPath]);
//
//     // Event Handlers
//     const onAutoCompleteChange = React.useCallback((_: React.SyntheticEvent, value: string | null) => {
//         if (!point || !event || !point.events)
//             return;
//
//         // Apply to Event
//         const eventIndex = point.events.findIndex(e => e.id === props.eventID);
//         point.events[eventIndex] = {
//             ...event,
//             name: value ?? ""
//         };
//
//         const newPoint = {
//             ...point,
//             events: [
//                 ...point.events
//             ]
//         };
//         setPoint(newPoint);
//     }, [point, setPoint, props.eventID, event]);
//     const onNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         if (!point || !event || !point.events)
//             return;
//
//         // Apply to Event
//         const eventIndex = point.events.findIndex(e => e.id === props.eventID);
//         point.events[eventIndex] = {
//             ...event,
//             name: makeAlphanumeric(e.target.value, "\\._-")
//         };
//
//         const newPoint = {
//             ...point,
//             events: [
//                 ...point.events
//             ]
//         };
//         setPoint(newPoint);
//     }, [point, setPoint, props.eventID, event]);
//     const onParamsChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         if (!point?.events || !event)
//             return;
//
//         // Apply to Event
//         const eventIndex = point.events.findIndex(e => e.id === props.eventID);
//         point.events[eventIndex] = {
//             ...event,
//             params: makeAlphanumeric(e.target.value, " \\._-")
//         };
//
//         // Apply to Point
//         const newPoint = {
//             ...point,
//             events: [
//                 ...point.events
//             ]
//         };
//         setPoint(newPoint);
//     }, [point, setPoint, props.eventID, event]);
//     const onDelete = React.useCallback(() => {
//         if (!point || !event || !point.events)
//             return;
//         const eventIndex = point.events.findIndex(e => e.id === props.eventID);
//         point.events.splice(eventIndex, 1);
//
//         const newPoint = {
//             ...point,
//             events: [
//                 ...point.events
//             ]
//         };
//         setPoint(newPoint);
//     }, [point, setPoint, props.eventID, event]);
//
//     return (
//         <ListItem disablePadding>
//             <Autocomplete
//                 fullWidth
//                 options={eventNames}
//                 size={"small"}
//                 autoHighlight
//                 value={event?.name ?? ""}
//                 onChange={onAutoCompleteChange}
//                 disableClearable
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         fullWidth
//                         onChange={onNameChange}
//                         label={"Name"}
//                         variant={"standard"}
//                     />
//                 )}
//             />
//             <TextField
//                 value={event?.params ?? ""}
//                 onChange={onParamsChange}
//                 size={"small"}
//                 label={"Parameters"}
//                 style={{margin: 4}}
//                 variant={"standard"}
//             />
//             <IconButton
//                 onClick={onDelete}
//                 size={"small"}
//             >
//                 <PlaylistRemoveIcon/>
//             </IconButton>
//         </ListItem>
//     )
// }