import { Box, Grid, Typography } from "@mui/material";

import { TableCompare } from "src/shared/components/TableCompare/TableCompare";
import {
    initialDataTableCompare,
    initialNewDataTableCompare,
    statusColorCompare,
} from "src/shared/constants/TableCompareValues";

export default function Index() {
    return (
        <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            minHeight={"100vh"}
            p={2}
        >
            <Grid
                mt={10}
                container
                maxWidth={"90%"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={10}
            >
                <Grid item container alignItems={'center'} justifyContent={'center'} flexDirection={'row'} columnSpacing={3}>
                    <Grid item sx={{ display: 'flex' }} flexDirection={'column'} gap={1}>
                        <Grid item sx={{ display: 'flex', alignItems: 'center', }} gap={1}>
                            <Box width={15} height={15} bgcolor={statusColorCompare.Created} borderRadius={'100%'} />
                            <Typography variant={"subtitle2"} fontWeight={'bold'}>
                                Adicionado
                            </Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', alignItems: 'center', }} gap={1}>
                            <Box width={15} height={15} bgcolor={statusColorCompare.Deleted} borderRadius={'100%'} />
                            <Typography variant={"subtitle2"} fontWeight={'bold'}>
                                Removido
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ display: 'flex' }} flexDirection={'column'} gap={1}>
                        <Grid item sx={{ display: 'flex', alignItems: 'center', }} gap={1}>
                            <Box width={15} height={15} bgcolor={statusColorCompare.Updated} borderRadius={'100%'} />
                            <Typography variant={"subtitle2"} fontWeight={'bold'}>
                                Alterado
                            </Typography>
                        </Grid>
                        <Grid item sx={{ display: 'flex', alignItems: 'center', }} gap={1}>
                            <Box width={15} height={15} bgcolor={statusColorCompare.Reordered} borderRadius={'100%'} />
                            <Typography variant={"subtitle2"} fontWeight={'bold'}>
                                Reordenado
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <TableCompare
                    currentDataProp={initialDataTableCompare}
                    newDataProp={initialNewDataTableCompare}
                />
            </Grid>
        </Grid>
    );
}
