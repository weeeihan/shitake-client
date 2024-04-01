import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { PlayerDisplay } from "@/structs/structs";

type Props = {
  data: PlayerDisplay[];
};

const Players = (props: Props) => {
  const [data] = [props.data];
  return (
    <div className="grid gap-4  ">
      {data != null &&
        data.map((player: PlayerDisplay, index: number) => (
          <div key={index} className="flex items-center space-x-4">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage alt="@jaredpalmer" src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="space-y-1.5">
              <h3
                className={
                  player.ready
                    ? "text-sm font-bold tracking-wide text-lime-500"
                    : "text-sm font-bold tracking-wide"
                }
                key={index}
              >
                {player.name}
              </h3>
            </div>
          </div>
        ))}
    </div>
    // <>

    //   {data.map((player: string, index: number) => (
    //     <div className="grid gap-0.5">
    //       <h2 className key={index}>{player}</h2>
    //     </div>
    //   ))}
    // </>
  );
};

export default Players;
