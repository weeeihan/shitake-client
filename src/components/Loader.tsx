import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = ({ size }: { size: number | undefined }) => {
  if (size === undefined) return <DNA height="50" width="50" />;
  return <DNA height={size.toString()} width={size.toString()} />;
};

export default Loader;
