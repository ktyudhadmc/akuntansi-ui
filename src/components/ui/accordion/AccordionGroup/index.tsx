import { useState } from "react";
import { AccordionGroupContext } from "./AccordionGroupContext";

interface AccordionGroupProps {
    children: React.ReactNode;
    defaultOpen?: string | null;
}

export default function AccordionGroup({
    children,
    defaultOpen = null,
}: AccordionGroupProps) {
    const [active, setActive] = useState<string | null>(defaultOpen);

    return (
        <AccordionGroupContext.Provider value={{ active, setActive }}>
            <div className="space-y-4">{children}</div>
        </AccordionGroupContext.Provider>
    );
}
