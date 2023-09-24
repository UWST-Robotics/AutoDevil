import GUID from "./GUID.ts";

export default interface PathEvent {
    id: GUID;
    name: string;
    params: string;
}