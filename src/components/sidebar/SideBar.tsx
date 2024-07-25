import {
    Body1,
    Body1Strong,
    Body1Stronger,
    Button,
    Tree,
    TreeItem,
    TreeItemLayout,
    TreeItemOpenChangeData,
    TreeItemOpenChangeEvent,
    tokens,
} from "@fluentui/react-components";
import {
    TextAlignJustify20Filled,
} from "@fluentui/react-icons";
import {useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


import { Tooltip } from "@fluentui/react-components";
import React from "react";
import { TreeMenu } from "../../interface/IMenu";


export const SideBar = ({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 
    const [navLinkGroups, setNavLinkGroups] = useState<TreeMenu[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [itemSelect, setItemSelect] = useState("Configuración");
    const [shouldRenderContent, setShouldRenderContent] = useState(true);
    const [itemOpenStates, setItemOpenStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        setItemSelect("Configuración");
    }, []);


    //_____LOCALHOST
    useEffect(() => {
        LinkMenus();
    }, []);


    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (!sidebarOpen) {
            const timeoutId = setTimeout(() => {
                setShouldRenderContent(false);
            }, 700);

            return () => clearTimeout(timeoutId);
        } else {
            const timeoutId = setTimeout(() => {
                setShouldRenderContent(true);
            }, 600);
            return () => clearTimeout(timeoutId);
        }
    }, [sidebarOpen]);

    const [seleccion, setSeleccion] = useState(0);

    useEffect(() => {
        setSeleccion(seleccion);
    }, []);

    useEffect(() => {
        if (navLinkGroups.length > 0) {
            const defaultOpenStates = navLinkGroups.reduce((acc, group) => {
                acc[group.name] = true;
                return acc;
            }, {} as { [key: string]: boolean });

            setItemOpenStates(defaultOpenStates);
        }
    }, [navLinkGroups]);

    //_________ MENU _________________
    const LinkMenus = () => {
        let LinkGroups: TreeMenu[] = [
            {
                key: "1",
                name: "Reto",
                links: [
                    {
                        key: "key1",
                        name: "Pregunta 1",
                        url: "/home/viajes",
                        icon: "",
                    },
                    {
                        key: "key2",
                        name: "Pregunta 2",
                        url: "/home/tonelajeByMaterial",
                        icon: "",
                    },
                    {
                        key: "key3",
                        name: "Pregunta 3",
                        url: "/home/DiferTonelaje",
                        icon: "",
                    },
                    {
                        key: "key4",
                        name: "Pregunta 4",
                        url: "/home/TonelajeTurno",
                        icon: "",
                    },
                    
                ],
            },
        

        ];

        setNavLinkGroups(LinkGroups);
    };

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const actualSelect = (index: string) => {
        setItemSelect(index);
    };

    const linksArray = navLinkGroups
        .map((item) => item.links)
        .filter(Boolean)
        .flat();

    const handleOpenChange = (
        event: TreeItemOpenChangeEvent,
        data: TreeItemOpenChangeData,
        itemKey: string
    ) => {
        setItemOpenStates((prev) => ({
            ...prev,
            [itemKey]: data.open,
        }));
    };

    return (
        <div
            style={{
                transition: "width 0.5s",
                overflowX: "hidden",
                height: "100%",
                width: sidebarOpen ? "17%" : "3.3%",
                backgroundColor: tokens.colorBrandForeground1,
            }}
        >
            <div
                /*  key={"udefinided"} */
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: tokens.colorBrandBackground2,
                    // backgroundColor: "#ffff",
                    overflow: "scroll",
                    position: "relative",
                }}
            >
                {navLinkGroups.map((item) => (
                    <div
                        style={{
                            whiteSpace: "nowrap",
                            visibility: sidebarOpen ? "visible" : "hidden",
                            opacity: sidebarOpen ? "1" : "0",
                            transition: "opacity 0.6s linear, visibility 0.6s linear",
                            display: shouldRenderContent ? "block" : "none",
                            width: "100%",
                        }}
                        key={item.key}
                    >
                        <Tree aria-label="Default Appearance" style={{ width: "100%" }}>
                            <TreeItem

                                itemType="branch"
                                style={{ width: "100%" }}
                                open={itemOpenStates[item.name]}
                                onOpenChange={(event, data) => handleOpenChange(event, data, item.name)}
                                key={item.key}
                            >
                                <TreeItemLayout
                                    style={{
                                        paddingLeft: "4px",
                                        whiteSpace: "nowrap",
                                    }}
                                    key={item.key}
                                >
                                    <Body1Strong key={item.key} style={{ color: "#717171", whiteSpace: "nowrap" }}>
                                        {item.name}
                                    </Body1Strong>
                                </TreeItemLayout>
                                <Tree style={{ width: "100%" }}>
                                    {item.links.map((item: any) => (
                                        <>
                                            <TreeItem itemType="leaf" style={{ width: "100%" }}>
                                                <NavLink
                                                    to={item.url}
                                                    style={{ textDecoration: "none", width: "100%", color: "#272727" }} //color del texto del menu
                                                >
                                                    <TreeItemLayout
                                                        style={{
                                                            paddingLeft: sidebarOpen ? "20px" : "4px",
                                                            transition: "padding-Left 0.5s",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "12.5rem",
                                                                height: "2.4rem",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "end",
                                                                cursor: "pointer2"
                                                            }}
                                                        >
                                                            <div
                                                                style={
                                                                    itemSelect === item.name
                                                                        ? {
                                                                            width: "96%",
                                                                            height: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            gap: "0.5rem",
                                                                            backgroundColor: "#ffff",
                                                                        }
                                                                        : {
                                                                            width: "96%",
                                                                            height: "100%",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            gap: "0.5rem",
                                                                        }
                                                                }
                                                                onClick={() => actualSelect(item.name)}
                                                            >
                                                                <div
                                                                    key={item.key}
                                                                    style={
                                                                        itemSelect === item.name
                                                                            ? { width: "1%", height: "100%", backgroundColor: tokens.colorBrandForeground1 }
                                                                            : { width: "1%", height: "100%" }
                                                                    }
                                                                />

                                                                <Body1 color="#272727">{item.name}</Body1>
                                                            </div>
                                                        </div>
                                                    </TreeItemLayout>
                                                </NavLink>
                                            </TreeItem>
                                        </>
                                    ))}
                                </Tree>
                            </TreeItem>
                        </Tree>
                    </div>
                ))}

                <div
                    style={{
                        whiteSpace: "nowrap",
                        visibility: !sidebarOpen ? "visible" : "hidden",
                        opacity: !sidebarOpen ? "1" : "0",
                        transition: "opacity 0.6s linear, visibility 0.6s linear",
                        display: !shouldRenderContent ? "block" : "none",
                        width: "100%",
                        marginBottom: "1rem",
                        marginTop: "0.2rem"
                    }}
                >
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Tooltip
                                appearance="inverted"
                                withArrow
                                relationship="label"
                                positioning={"after"}
                                content={"Expandir"}
                            >
                                <Button
                                    size="medium"
                                    appearance="subtle"
                                    style={{ borderRadius: "20px" }}
                                    icon={<TextAlignJustify20Filled style={{ color: tokens.colorBrandForeground1 }}></TextAlignJustify20Filled>}
                                    onClick={() => {
                                        setSidebarOpen(!sidebarOpen);
                                    }}
                                />
                            </Tooltip>
                            <Body1Stronger style={{ color: tokens.colorBrandForeground1 }}>Beta v1</Body1Stronger>
                            <div style={{ width: "100%", height: "0.1rem", backgroundColor: tokens.colorBrandForeground1, marginTop: "0.3rem" }} />
                        </div>
                    </div>
                </div>

                {linksArray.map((item) => (
                    <div
                        style={{
                            whiteSpace: "nowrap",
                            visibility: !sidebarOpen ? "visible" : "hidden",
                            opacity: !sidebarOpen ? "1" : "0",
                            transition: "opacity 0.6s linear, visibility 0.6s linear",
                            display: !shouldRenderContent ? "block" : "none",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                width: "100%",
                                alignItems: "center",
                                marginTop: "0.3rem",
                            }}
                        >
                            <NavLink to={item.url}>
                                <Tooltip
                                    appearance="inverted"
                                    withArrow
                                    content={item.name}
                                    relationship="label"
                                    positioning={"after"}
                                >
                                    <Button

                                        size="large"
                                        style={
                                            itemSelect === item.name
                                                ? { border: "none", backgroundColor: "#fff" }
                                                : { border: "none", backgroundColor: "#eee" }
                                        }
                                        onClick={() => actualSelect(item.name)}
                                    />
                                </Tooltip>
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
