import { darkTheme, lightTheme } from "@/Muitheme/DarkLightTheme";
import { useAppSelector } from "@/store/store";
import { CategoryType } from "@/types";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
    category,
    current,
    setCurrent,
    jumlahData,
    jumlahDataPerHalaman,
    selectedOptions,
    setSelectedOptions,
}: {
    category: CategoryType[];
    current?: number;
    setCurrent?: Dispatch<SetStateAction<number>>;
    jumlahData?: number;
    jumlahDataPerHalaman?: number;
    selectedOptions: CategoryType[];
    setSelectedOptions: Dispatch<SetStateAction<CategoryType[]>>;
}) {
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <Autocomplete
                multiple
                value={selectedOptions}
                onChange={(e, val) => {
                    setSelectedOptions(val);
                    if (
                        current! >
                        Math.ceil(jumlahData! / jumlahDataPerHalaman!)
                    ) {
                        setCurrent && setCurrent(1);
                    }
                }}
                id="checkboxes-tags-demo"
                options={category!}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Checkboxes"
                        placeholder="Favorites"
                    />
                )}
            />
        </ThemeProvider>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
