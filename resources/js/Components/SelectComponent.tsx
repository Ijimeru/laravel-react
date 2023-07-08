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
type setDataByObject<TForm> = (data: TForm) => void;
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(
    key: K,
    value: TForm[K]
) => void;
interface PostDashboardType {
    title: string;
    image: File | null | string;
    categories: string[];
    body: string;
    status: string;
    [key: string]: unknown;
}

export default function SelectComponent({
    setData,
    data,
    label,
    option,
    type,
}: {
    label: string;
    data: string;
    option: string[];
    type: string;
    setData: setDataByObject<PostDashboardType> &
        setDataByMethod<PostDashboardType> &
        setDataByKeyValuePair<PostDashboardType>;
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
                    value={data}
                    label={label}
                    onChange={(e: SelectChangeEvent) => {
                        setData(type, e.target.value);
                    }}
                >
                    {option.map((opt) => (
                        <MenuItem value={opt}>{opt}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}
