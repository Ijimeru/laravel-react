import Main from "@/Layouts/MainLayout";
import { OrganizationTree, content } from "@/types";
import { Head } from "@inertiajs/react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "@emotion/styled";
import { Fragment } from "react";

const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
`;
export default function Kepengurusan({
    logo,
    visi,
    kontak,
}: {
    logo: content;
    visi: content;
    kontak: content;
}) {
    let arr: OrganizationTree[] = [
        {
            name: "Luter Evons",
            jabatan: "Ketua Himpunan",
            children: [
                {
                    name: "BA",
                    children: [
                        {
                            name: "BAA",
                            children: [
                                {
                                    name: "BAAA",
                                },
                                {
                                    name: "BAAB",
                                },
                                {
                                    name: "BAAC",
                                },
                            ],
                        },
                        {
                            name: "BAB",
                            children: [
                                {
                                    name: "BABA",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "BB",
                },
            ],
        },
    ];
    const Card = ({ data }: { data: OrganizationTree[] }) => {
        return (
            <>
                {data.map((item, key) => (
                    <Fragment key={key}>
                        <TreeNode
                            label={
                                <StyledNode>
                                    <h2>{item.name}</h2>
                                    <p>{item.jabatan}</p>
                                </StyledNode>
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
    return (
        <Main logo={logo} visi={visi} kontak={kontak}>
            <Head title="Kepengurusan" />
            <Tree
                lineWidth={"2px"}
                lineColor={"green"}
                lineBorderRadius={"10px"}
                label={<StyledNode>Struktur Himpunan 2022</StyledNode>}
            >
                <Card data={arr} />
            </Tree>
        </Main>
    );
}
