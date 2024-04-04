import { Skeleton } from "@mui/material";

import { LazyLoading } from "./LazyLoading";

interface ILazyImage extends React.ImgHTMLAttributes<HTMLImageElement> {}

const LazyImage = (props: ILazyImage) => (
  <LazyLoading
    skeleton={
      <Skeleton
        variant="rounded"
        width={props.width}
        height={100}
        sx={{ p: "0px !important", m: 0 }}
      />
    }
  >
    {() => <img {...props} loading="lazy" />}
  </LazyLoading>
);

export default LazyImage;
