type GUID = string & { __GUID: true };

export default GUID;

export const EMPTY_GUID: GUID = "00000000-0000-0000-0000-000000000000" as GUID;