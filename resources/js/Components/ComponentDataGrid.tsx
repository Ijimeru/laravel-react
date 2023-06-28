import { DashboardContext } from "@/Context/DashboardContext";
import { darkTheme, lightTheme } from "@/Muitheme/DarkLightTheme";
import { PostType } from "@/types";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
export default function ComponentDataGrid({
    data,
    columns,
}: {
    data: PostType[] | null;
    columns: GridColDef[];
}) {
    const { mode } = useContext(DashboardContext);
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
                checkboxSelection
                sx={{
                    maxHeight: "500px",
                    "&.MuiDataGrid-cell": { maxWidth: "100%" },
                }}
            />
        </ThemeProvider>
    );
}
