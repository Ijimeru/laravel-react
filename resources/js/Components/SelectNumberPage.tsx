import { darkTheme, lightTheme } from "@/Muitheme/DarkLightTheme";
import { useAppSelector } from "@/store/store";
import {
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ThemeProvider,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function SelectNumberPage({
    jumlahPostPerHalaman,
    label,
    jumlahPost,
    current,
    setCurrent,
    setJumlahPostPerHalaman,
}: {
    jumlahPostPerHalaman: string;
    label: string;
    jumlahPost: number;
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    setJumlahPostPerHalaman: Dispatch<SetStateAction<number>>;
}) {
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={jumlahPostPerHalaman.toString()}
                    label={label}
                    onChange={(e: SelectChangeEvent) => {
                        if (
                            current >
                            Math.ceil(jumlahPost / parseInt(e.target.value))
                        ) {
                            setJumlahPostPerHalaman &&
                                setJumlahPostPerHalaman(
                                    parseInt(e.target.value)
                                );
                            setCurrent(1);
                        } else {
                            setJumlahPostPerHalaman &&
                                setJumlahPostPerHalaman(
                                    parseInt(e.target.value)
                                );
                        }
                    }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}
