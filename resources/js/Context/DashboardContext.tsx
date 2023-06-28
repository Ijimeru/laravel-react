import {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

interface DashboardContextType {
    mode: string | null;
    setMode: Dispatch<SetStateAction<string | null>>;
}

export const DashboardContext = createContext<DashboardContextType>({
    mode: "light",
    setMode: () => {},
});

interface DashboardProviderProps {
    children: ReactNode;
}

const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<string | null>(
        localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    );
    console.log(mode);
    return (
        <DashboardContext.Provider value={{ mode, setMode }}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;
