import {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

interface HomeContextType {
    mode: string | null;
    setMode: Dispatch<SetStateAction<string | null>>;
}

export const HomeContext = createContext<HomeContextType>({
    mode: "light",
    setMode: () => {},
});

interface HomeProviderProps {
    children: ReactNode;
}

const HomeProvider: FC<HomeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<string | null>(
        localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    );
    return (
        <HomeContext.Provider value={{ mode, setMode }}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeProvider;
