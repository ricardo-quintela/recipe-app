import { useState } from "react";

export function useToggle(initialState: boolean = false) {
    const [state, setState] = useState<boolean>(initialState);

    return { state, toggleState: () => setState((prev) => !prev) };
}
