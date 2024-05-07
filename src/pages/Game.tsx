// types
import { Message, Player, Room } from "../utils/struct";

// functions
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as handlers from "../utils/handlers";
import * as utils from "../utils/utils";

// UI
import GameCanvas from "../components/GameCanvas";

// Context
import { WebsocketContext } from "../modules/websocket_provider";
import { GamestateContext } from "../modules/gamestate_provider";

// Store
import useStore from "../utils/store";

const Game = () => {
  const { player, roomData, State } = useContext(GamestateContext);
  const { conn } = useContext(WebsocketContext);
  // const [playedCards, setPlayedCards] = useState<string>("");
  // const [isPlayer, setIsPlayer] = useState(false);

  // const store = useStore();

  // const [player, setPlayer] = useState<Player>({
  //   id: "",
  //   name: "",
  //   score: 0,
  //   hand: [],
  //   ready: false,
  // });
  // const [roomData, setRoomData] = useState<Room>({
  //   id: "",
  //   state: "",
  //   players: [],
  //   deck: [],
  // });

  const isLoading =
    roomData.deck.length == 0 ||
    player.hand.length == 0 ||
    conn == null ||
    State == null
      ? true
      : false;

  // useEffect(() => {
  //   if (id !== "") {
  //     if (id == "none") {
  //       navigate("/");
  //       return;
  //     }
  //     handlers.CheckPlayer(id, navigate, "/game", setIsPlayer);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (isPlayer && State !== null) {
  //     if (conn == null) {
  //       handlers.ConnectToGame(id, setConn);
  //     }
  //     // fetch player dat
  //     handlers.GetPlayer(id, setPlayer);
  //     // fetch room data
  //     handlers.GetRoom(id, navigate, "/game", setRoomData, State);
  //   }
  // }, [isPlayer, State]);

  // useEffect(() => {
  //   // if (conn == null) {
  //   //   handlers.CheckPlayer(id, navigate, "/game", setIsPlayer);
  //   // }
  //   if (conn !== null) {
  //     conn.onmessage = (message) => {
  //       const m: Message = JSON.parse(message.data);
  //       console.log(m);
  //       if (m.state == State.COUNT) {
  //         setCountDown(parseInt(m.remark));
  //       }
  //       if (m.state == State.PROCESS) {
  //         setPlayedCards(m.remark);
  //         handlers.GetRoom(id, navigate, "/game", setRoomData, State);
  //         handlers.GetPlayer(id, setPlayer);
  //       }
  //       if (m.state == State.CHOOSE_ROW) {
  //         console.log(m.remark);
  //         store.setIsChooseRow(true);
  //       }
  //     };

  //     conn.onclose = (event) => {
  //       console.log("Connection closed due to ", event.reason);
  //       handlers.CheckPlayer(id, navigate, "/game", setIsPlayer);
  //     };
  //   }
  // }, [conn]);

  // const navigate = useNavigate();

  const [chosenCard, setChosenCard] = useState<number>(0);
  // const [countDown, setCountDown] = useState<number>(0);

  const chooseRow = (row: number) => {
    console.log(row);
    // setIsChooser(false);
    // console.log("Chose row " + row);
    // if (conn != null && row != -1) {
    //   conn.send(actions(State.ROW, chosenCard, row));
    // }
  };

  // const testDeck: number[][] = [
  //   [46, 56, 98, 100],
  //   [12, 15, 23, 24],
  //   [1, 3, 5, 7],
  //   [9],
  // ];
  // const testHand: number[] = [1, 2, 3, 4, 55, 6, 7, 8, 94, 23, 13];
  // const testScore: number = 20;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <GameCanvas />
    </>
  );
};

export default Game;
