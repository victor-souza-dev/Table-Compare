import { ReactElement, Suspense, lazy } from "react";

interface ILazyLoading {
  children: () => ReactElement;
  skeleton?: ReactElement;
}

export function LazyLoading({ children, skeleton }: ILazyLoading) {
  const lazyValue = () => Promise.resolve({ default: children });
  const SkeletonComponent = () => skeleton || <div>Loading...</div>;
  const LazyComponent = lazy(() => lazyValue());

  return (
    <Suspense fallback={<SkeletonComponent />}>
      <LazyComponent />
    </Suspense>
  );
}
