import { useCallback, useEffect, useRef, useState } from "react";

import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { v4 } from "uuid";

import {
    IDataWithStatus,
    StatusEnum,
} from "src/shared/constants/Interfaces/TableCompare";
import {
    headTableCompare,
    statusColorCompare,
} from "src/shared/constants/TableCompareValues";

interface IProps {
    currentDataProp: IDataWithStatus[];
    newDataProp: IDataWithStatus[];
}

export function TableCompare({ currentDataProp, newDataProp }: IProps) {
    const [currentData, setCurrentData] =
        useState<IDataWithStatus[]>(currentDataProp);
    const [newData, setNewData] = useState<IDataWithStatus[]>(newDataProp);
    const [orderHover, setOrderHover] = useState<string | null>(null);

    const [syncScroll, setSyncScroll] = useState<boolean>(false);

    const currentDataRef = useRef<HTMLDivElement>(null);
    const newDataRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        applyStatus();
    }, []);

    function formatTextLimit(text: string, limit: number = 10) {
        return text.length > limit ? `${text.substring(0, limit)}...` : text;
    }

    function handleMouseEnter(code: string): void {
        if (
            currentData.find((item) => item.code === code)?.status !==
            StatusEnum.Normal
        ) {
            return;
        }

        setOrderHover(code);
    }

    function applyStatus(): void {
        const currentDataCopy = [...currentData];
        const newDataCopy = [...newData];

        // DELETE
        currentDataCopy.forEach((currentDataItem, index) => {
            const newDataItem = newDataCopy.find(
                (newDataItem) => newDataItem.code === currentDataItem.code,
            );

            if (
                !newDataItem &&
                currentDataCopy[index]?.status !== StatusEnum.Deleted &&
                currentDataCopy[index]?.status !== StatusEnum.None
            ) {
                currentDataCopy[index].status = StatusEnum.Deleted;
            }
        });

        // CREATE AND UPDATE
        newDataCopy.forEach((newDataItem) => {
            const currentDataItem = currentDataCopy.find(
                (currentDataItem) => currentDataItem.code === newDataItem.code,
            );

            if (currentDataItem) {
                const newDataItemIndex = newDataCopy.findIndex(
                    (item) => item.code === newDataItem.code,
                );

                if (
                    currentDataItem.name !== newDataItem.name ||
                    currentDataItem.type !== newDataItem.type
                ) {
                    newDataCopy[newDataItemIndex].status = StatusEnum.Updated;
                }
            } else {
                const newDataItemIndex = newDataCopy.findIndex(
                    (item) => item.code === newDataItem.code,
                );

                newDataCopy[newDataItemIndex].status = StatusEnum.Created;
            }
        });

        addNoneObject(currentDataCopy, newDataCopy);
    }

    function addNoneObject(
        current: IDataWithStatus[],
        newDt: IDataWithStatus[],
    ): void {
        const currentDataCopy = [...current];
        const newDataCopy = [...newDt];

        // ADD IN NEW TABLE
        currentDataCopy.forEach((item, index) => {
            if (
                item.status === StatusEnum.Deleted &&
                newDataCopy[index]?.status !== StatusEnum.None
            ) {
                newDataCopy.splice(index + 1, 0, { ...item, status: StatusEnum.None });
            }
        });

        // REMOVE IN CURRENT TABLE
        newDataCopy.forEach((item, index) => {
            if (
                item.status === StatusEnum.Created &&
                currentDataCopy[index]?.status !== StatusEnum.None
            ) {
                currentDataCopy.splice(index, 0, { ...item, status: StatusEnum.None });
            }
        });

        setCurrentData(currentDataCopy);
        setNewData(newDataCopy);
    }

    const onSyncScroll = useCallback((index: number) => {
        if (syncScroll) {
            const scrollOne = currentDataRef.current;
            const scrollTwo = newDataRef.current;

            if (scrollOne && scrollTwo) {
                if (index === 1) scrollTwo.scrollTo({ top: scrollOne.scrollTop, behavior: "instant" });
                if (index === 2) scrollOne.scrollTo({ top: scrollTwo.scrollTop, behavior: "instant" });
            }
        }
    }, [syncScroll]);

    function scrollToItem(code: string): void {
        const element = document.getElementById(code);

        const indexText = code.indexOf(":");
        const codePosition = code.substring(0, indexText);

        handleMouseEnter(codePosition);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }

    return (
        <Grid container p={{ xs: 0, md: 4 }} gap={4}>
            <Grid container justifyContent={"flex-end"}>
                <Button
                    variant="contained"
                    color={`${syncScroll ? "success" : "error"}`}
                    onClick={() => setSyncScroll(!syncScroll)}
                    fullWidth
                >
                    Sincronização das tabelas {syncScroll ? "Ativada" : "Desativada"}
                </Button>
            </Grid>
            <Grid container width={"100%"} flexDirection={"row"} gap={4}>
                {[currentData, newData].map((data, indexType) => (
                    <Grid item xs={12} md={5.85}>
                        <Grid container flexDirection={'column'}>
                            <Grid item key={v4()} xs={6} pl={{ md: 7 }} pb={1}>
                                <Typography variant="button">{indexType === 0 ? "Antes" : "Depois"}</Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            key={`${indexType === 0 ? "scroll-currentData" : "scroll-newData"}`}
                            ref={indexType === 0 ? currentDataRef : newDataRef}
                            onScroll={() => onSyncScroll(indexType + 1)}
                            sx={{
                                display: "flex",
                                maxHeight: "600px",
                                overflow: "auto",
                            }}

                        >
                            <Grid
                                item
                                sx={{ display: "flex" }}
                                flexDirection={"column"}
                                pt={7}
                                gap={0}
                            >
                                {data.map((item, index) => {
                                    let countNone = 0;

                                    for (let i = 0; i < index; i++) {
                                        if (data[i].status === StatusEnum.None) {
                                            countNone++;
                                        }
                                    }

                                    const textNumber =
                                        item.status === StatusEnum.None ? "#" : index + 1 - countNone;

                                    return (
                                        <Typography
                                            key={v4()}
                                            id={`${item.code}:${indexType === 0 ? "currentData" : "newData"}`}
                                            variant="caption"
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                padding: { xs: "8px 8px 8px 0px", md: "8px" },
                                                margin: { xs: "6.5px 6.5px 6.5px 0px", md: "6.5px" },
                                                bgcolor:
                                                    orderHover !== item.code
                                                        ? ""
                                                        : item.status === StatusEnum.Updated
                                                            ? statusColorCompare[StatusEnum.Updated]
                                                            : statusColorCompare[StatusEnum.Reordered],
                                                borderRadius: "100%",
                                                textAlign: "center",
                                                fontSize: "1rem",
                                                cursor: "pointer",
                                            }}
                                            // onMouseEnter={() => handleMouseEnter(item.code)}
                                            // onMouseLeave={resetOrderHover}
                                            onClick={() =>
                                                scrollToItem(
                                                    `${item.code}:${indexType !== 0 ? "currentData" : "newData"}`,
                                                )
                                            }
                                        >
                                            {textNumber}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                            <Grid item width={"100%"}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                {headTableCompare.map((head) => (
                                                    <TableCell key={v4()} align="left">
                                                        {head}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((row) => {
                                                if (row.status === StatusEnum.None) {
                                                    return (
                                                        <TableRow
                                                            key={v4()}
                                                            sx={{
                                                                backgroundImage:
                                                                    "linear-gradient(45deg, transparent 25%, #00000025 25%, #00000024 50%, transparent 50%, transparent 75%, #00000025 75%, #00000025)",
                                                                backgroundSize: "8px 8px",
                                                                height: 53.02,
                                                            }}
                                                        >
                                                            <TableCell align="left" />
                                                            <TableCell align="left" />
                                                            <TableCell align="left" />
                                                        </TableRow>
                                                    );
                                                }

                                                return (
                                                    <TableRow
                                                        key={v4()}
                                                        sx={{
                                                            "&:last-child td, &:last-child th": { border: 0 },
                                                            bgcolor:
                                                                row.code === orderHover &&
                                                                    row.status !== StatusEnum.Updated
                                                                    ? statusColorCompare[StatusEnum.Reordered]
                                                                    : statusColorCompare[row.status],
                                                        }}
                                                    // onMouseEnter={() => handleMouseEnter(row.code)}
                                                    // onMouseLeave={resetOrderHover}
                                                    >
                                                        <TableCell align="left">{formatTextLimit(row.code)}</TableCell>
                                                        <TableCell align="left">{formatTextLimit(row.name)}</TableCell>
                                                        <TableCell align="left">{formatTextLimit(row.type)}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
