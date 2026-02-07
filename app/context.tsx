"use client";
import { useRouter } from "next/dist/client/components/navigation";
import { createContext, useContext, ReactNode, useState } from "react";

interface LayoutContextType {
    currentPage: string;
    handleNavigate: (section: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState("home");

    const handleNavigate = (section: string) => {
        setCurrentPage(section);
        router.push(`/home/${section}`);
    };

    return (
        <LayoutContext.Provider value={{ currentPage, handleNavigate }}>
            {children}
        </LayoutContext.Provider>
    );
};

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within LayoutProvider");
    }
    return context;
};