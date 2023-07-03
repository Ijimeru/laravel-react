import Main from "@/Layouts/MainLayout";
import { OrganizationTree, content } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "@emotion/styled";
import { Fragment, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";

const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
    width: fit-content;
`;
export default function Kepengurusan({
    data,
    logo,
    visi,
    kontak,
}: {
    logo: content;
    visi: content;
    kontak: content;
    data: { name: string; kepengurusan: string };
}) {
    const Card = ({ data }: { data: OrganizationTree[] }) => {
        return (
            <>
                {data.map((item, key) => (
                    <Fragment key={key}>
                        <TreeNode
                            label={
                                item.className == "nostyle" ? (
                                    <div className="relative h-44 flex flex-row justify-center">
                                        <div className="border-2 border-l-green-700 w-[0.1px] h-44 border-white "></div>
                                    </div>
                                ) : (
                                    <StyledNode>
                                        <p className="w-max m-auto">
                                            {item.jabatan}
                                        </p>
                                        {item.name
                                            ?.split("?")
                                            .map((item, key) => (
                                                <h2
                                                    key={key}
                                                    className="w-max m-auto"
                                                >
                                                    {item}
                                                </h2>
                                            ))}
                                    </StyledNode>
                                )
                            }
                        >
                            {item.children?.length ? (
                                <Card data={item.children} />
                            ) : null}
                        </TreeNode>
                    </Fragment>
                ))}
            </>
        );
    };
    const chart: OrganizationTree[] = JSON.parse(data.kepengurusan);
    return (
        // <Main logo={logo} visi={visi} kontak={kontak} mauto={true}>
        <>
            <Head title="Kepengurusan" />
            <div className="flex flex-col mt-10">
                <PrimaryButton className="w-40 self-start">
                    <Link as="a" href={route("home")}>
                        Kembali ke Halaman awal
                    </Link>
                </PrimaryButton>
                <Tree
                    lineWidth={"2px"}
                    lineColor={"green"}
                    lineBorderRadius={"10px"}
                    label={
                        <StyledNode>Struktur Himpunan {data.name}</StyledNode>
                    }
                >
                    <Card data={chart} />
                </Tree>
            </div>
        </>
        // </Main>
    );
}
