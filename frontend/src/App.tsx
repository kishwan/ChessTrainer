import { useRef, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import "./App.css";

export default function Board() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());

  const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): boolean => {
      const game = gameRef.current;
  
      const isWhitePawn = piece?.pieceType.toLowerCase() === "wp";
      const isBlackPawn = piece?.pieceType.toLowerCase() === "bp";
      const isPromotion =
        (isWhitePawn && targetSquare!.endsWith("8")) ||
        (isBlackPawn && targetSquare!.endsWith("1"));

      const move = game.move({
        from: sourceSquare,
        to: targetSquare!,
        promotion: isPromotion ? "q" : undefined,
      });

      if (!move) return false;
      setFen(game.fen());
      return true;
    },
    []
  );

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
    </div>
  );
}
