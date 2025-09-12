import { Chessboard } from "react-chessboard";
import { useChessGame } from "../hooks/useChessGame";
import "./Board.css";
export default function Board() {
  const { fen, turn, onPieceDrop } = useChessGame();

  return (
    <div className="board">
      <Chessboard
        options={{
          position: fen,
          onPieceDrop: onPieceDrop,
          boardStyle: {
            width: "50%",
            height: "50%",
          },
        }}
      />
      <div className="turnIndicator">
        {turn === "w" ? "White to move" : "Black to move"}
      </div>
    </div>
  );
}
