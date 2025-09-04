import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useChessGame } from "./hooks/useChessGame";
import "./App.css";

export default function Board() {
  const { fen, turn, makeMove } = useChessGame();

  const onPieceDrop = ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) => {
    return makeMove(sourceSquare, targetSquare!, piece?.pieceType);
  };

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
