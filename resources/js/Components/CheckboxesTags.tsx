import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CategoryType, PostType } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { router } from "@inertiajs/react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
    category,
    current,
    setCurrent,
    jumlahPost,
    jumlahPostPerHalaman,
    selectedOptions,
    setSelectedOptions,
}: {
    category: CategoryType[];
    current?: number;
    setCurrent?: Dispatch<SetStateAction<number>>;
    jumlahPost?: number;
    jumlahPostPerHalaman?: number;
    selectedOptions: CategoryType[];
    setSelectedOptions: Dispatch<SetStateAction<CategoryType[]>>;
}) {
    return (
        <Autocomplete
            multiple
            value={selectedOptions}
            onChange={(e, val) => {
                setSelectedOptions(val);
                if (current! > Math.ceil(jumlahPost! / jumlahPostPerHalaman!)) {
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
            style={{ width: "100%", backgroundColor: "#d58bfa" }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    className="text-white"
                    label="Checkboxes"
                    placeholder="Favorites"
                />
            )}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
