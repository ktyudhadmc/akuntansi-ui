import { createContext, useContext } from "react";

interface AccordionGroupContextType {
    active: string | null;
    setActive: (value: string | null) => void;
}

export const AccordionGroupContext = createContext<AccordionGroupContextType | null>(null);

export const useAccordion = () => {
    const ctx = useContext(AccordionGroupContext);
    if (!ctx) {
        throw new Error("AccordionItem must be used inside AccordionGroup");
    }
    return ctx;
};
