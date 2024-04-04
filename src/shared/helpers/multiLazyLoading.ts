import { LazyLoading } from "../components/LazyLoading";

interface IContent {
  [key: string]: () => JSX.Element;
}

interface IApplyLazyLoading {
  [key: string]: (() => JSX.Element) | IContent;
}

function applyLazyLoadingToFunction(
  func: () => JSX.Element,
): () => JSX.Element {
  return () => LazyLoading({ children: func });
}

function applyLazyLoadingToObject(root: IApplyLazyLoading): IContent {
  const newRoot: IApplyLazyLoading = {};

  for (const key in root) {
    const value = root[key];
    if (typeof value === "function") {
      newRoot[key] = applyLazyLoadingToFunction(value);
    } else if (typeof value === "object" && value !== null) {
      newRoot[key] = applyLazyLoadingToObject(value as IApplyLazyLoading);
    }
  }

  return newRoot as IContent;
}

export function multiLazyLoading(root: IApplyLazyLoading): IContent {
  return applyLazyLoadingToObject(root);
}
