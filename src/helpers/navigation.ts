import type { Location, NavigateFunction } from "react-router-dom";

export const navigateKeepHash = (
  navigate: NavigateFunction,
  location: Location,
  pathname: string
) => {
  navigate({
    pathname,
    hash: location.hash,
  });
};
