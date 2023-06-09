import { darkTheme, lightTheme } from "@/Muitheme/DarkLightTheme";
import { useAppSelector } from "@/store/store";
import { BookType, PostType, User } from "@/types";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
export default function ComponentDataGrid({
    data,
    columns,
    notcheckbox,
}: {
    data: PostType[] | BookType[] | User[] | null;
    columns: GridColDef[];
    notcheckbox?: boolean;
}) {
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <DataGrid
                rows={data!}
                columns={columns}
                pageSizeOptions={[100, 50, 25, 10, 5]}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                checkboxSelection={notcheckbox == true ? false : true}
                sx={{
                    maxHeight: "500px",
                    "&.MuiDataGrid-cell": { maxWidth: "100%" },
                }}
            />
        </ThemeProvider>
    );
}
