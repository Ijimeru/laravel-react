import { PageProps } from "@/types";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
export default function Pagination({
    jumlahPost,
    jumlahPostPerHalaman,
    current,
    setCurrent,
    className,
}: {
    jumlahPost: number;
    current: number;
    className?: string;
    setCurrent: Dispatch<SetStateAction<number>>;
    jumlahPostPerHalaman: number;
}) {
    const jumlahHalaman = Math.ceil(jumlahPost / jumlahPostPerHalaman);
    let next: number = current + 1;
    let prev: number = current - 1;
    if (jumlahHalaman == 1) {
        return null;
    }
    return (
        <div
            className={
                `flex w-full justify-center flex-col gap-y-4 ` + className
            }
        >
            <div className="flex gap-x-2 w-fit bg-primaryDark py-2 px-5 rounded-md shadow-md">
                <Button
                    onClick={() => setCurrent(prev > 0 ? prev : 1)}
                    className={`${prev > 0 ? "" : "cursor-not-allowed"}`}
                    disabled={prev > 0 ? false : true}
                >
                    prev
                </Button>

                <Button
                    className={`${
                        next > jumlahHalaman ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                        setCurrent(next > jumlahHalaman ? jumlahHalaman : next)
                    }
                    disabled={next > jumlahHalaman ? true : false}
                >
                    next
                </Button>
            </div>
            <div>
                {/* <FormControl fullWidth>
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{ zIndex: 100 }}
                    >
                        Jumlah
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={jumlahPostPerHalaman.toString()}
                        label="Jumlah"
                        onChange={(e: SelectChangeEvent) => {
                            if (
                                current >
                                Math.ceil(jumlahPost / parseInt(e.target.value))
                            ) {
                                setJumlahPostPerHalaman &&
                                    setJumlahPostPerHalaman(
                                        parseInt(e.target.value)
                                    );
                                router.get(
                                    route("berita"),
                                    { page: 1 },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                    }
                                );
                            }
                            setJumlahPostPerHalaman &&
                                setJumlahPostPerHalaman(
                                    parseInt(e.target.value)
                                );
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl> */}
            </div>
        </div>
    );
}
