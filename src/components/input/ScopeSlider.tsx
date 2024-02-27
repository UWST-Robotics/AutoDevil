import { RangeSlider } from "@blueprintjs/core";
import useScope from "../../hooks/Scope/useScope.ts";
import usePathValue from "../../hooks/Path/usePath.ts";

export default function ScopeSlider() {
    const [scope, setScope] = useScope();
    const path = usePathValue();


    return (
        <RangeSlider
            min={0}
            max={1}
            stepSize={1 / (path.points.length - 1)}
            labelRenderer={false}
            value={[scope.start, scope.end]}
            onChange={([start, end]) => setScope({ start, end })}
        />
    )
}