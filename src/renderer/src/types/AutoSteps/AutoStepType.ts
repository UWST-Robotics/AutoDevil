// export default interface AutoStepType {
//     isHidden?: boolean;
//     name: string;
//     icon: React.ReactNode;
//     prefix: string;
//     create: () => AutoStep;
//     deserialize: (serialized: string) => AutoStep;
//     serialize: (step: AutoStep) => string;
// }

enum AutoStepType {
    DRIVE = "DRIVE",
    ROTATE = "ROTATE",
    GOTO = "GOTO",
    START = "START",
    STOP = "STOP",
    UNKNOWN = "UNKNOWN"
}

export default AutoStepType;