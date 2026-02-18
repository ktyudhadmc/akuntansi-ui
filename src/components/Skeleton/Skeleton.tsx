import React from "react";
import clsx from "clsx";
import "./Skeleton.css";

interface SkeletonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  isLoading,
  children,
  className,
  height = "2.5rem",
  width = "100%",
  borderRadius = "4px",
}) => {
  if (isLoading) {
    return (
      <div
        className={clsx("skeleton", className)}
        style={{ minHeight: height, width, borderRadius }}
      ></div>
    );
  }

  return <>{children}</>;
};

export default Skeleton;
