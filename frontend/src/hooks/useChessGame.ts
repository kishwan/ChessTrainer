import { useRef, useState, useCallback } from "react";
import { Chess } from "chess.js";

export function useChessGame() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [turn, setTurn] = useState(gameRef.current.turn());

  const makeMove = useCallback(
    (from: string, to: string, piece?: string) => {
      const game = gameRef.current;

      const isWhitePawn = piece?.toLowerCase() === "wp";
      const isBlackPawn = piece?.toLowerCase() === "bp";
      const isPromotion =
        (isWhitePawn && to.endsWith("8")) || (isBlackPawn && to.endsWith("1"));

      const move = game.move({
        from,
        to,
        promotion: isPromotion ? "q" : undefined,
      });

      if (!move) return false;

      setFen(game.fen());
      setTurn(game.turn());
      return true;
    },
    []
  );

  return {
    fen,
    turn,
    makeMove,
  };
}