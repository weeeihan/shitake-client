import React from "react";
import * as images from "../assets/images/images";

type Props = {};

const Playing = () => {
  const played = [
    {
      name: "Han",
      played: 50,
    },
    {
      name: "Kelly",
      played: 55,
    },
    {
      name: "Jordan",
      played: 12,
    },
  ];
  return (
    <>
      {played.map((p, index) => (
        <div>
          {p.name} - {p.played}
        </div>
      ))}
    </>
  );
};

export default Playing;
