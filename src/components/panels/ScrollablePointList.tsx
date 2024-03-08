import usePathValue from "../../hooks/Path/usePath.ts";
import { Alignment, Button, ButtonGroup, Classes } from "@blueprintjs/core";
import useSelectedPoint from "../../hooks/Point/useSelectPoint.ts";

export default function ScrollablePointList() {
    const path = usePathValue();
    const [selectedPointID, setSelectedPointID] = useSelectedPoint();

    return (
        <ButtonGroup
            vertical
            fill
        >
            {path.points.map((point, index) => (
                <Button
                    key={point.id}
                    minimal
                    onClick={() => setSelectedPointID(point.id)}
                    small
                    fill
                    alignText={Alignment.LEFT}
                    active={selectedPointID === point.id}
                    intent={point.state?.isReversed ? "danger" : "success"}
                    rightIcon={(
                        <span className={Classes.TEXT_MUTED}>
                            {point.events?.map((event) => event.name).join(", ")}
                        </span>
                    )}
                >
                    {index + 1}
                </Button>
            ))}
        </ButtonGroup>
    )
}