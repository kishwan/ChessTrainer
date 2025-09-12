import { useRef, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { type PieceDropHandlerArgs } from "react-chessboard";

export function useChessGame() {
    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());
    const [turn, setTurn] = useState(gameRef.current.turn());

    const onPieceDrop = useCallback(
    ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): boolean => {
      const game = gameRef.current;
      if (!targetSquare) return false; // Invalid move or dropped outside of board

      const isWhitePawn = piece?.pieceType.toLowerCase() === "wp";
      const isBlackPawn = piece?.pieceType.toLowerCase() === "bp";
      const isPromotion =
        (isWhitePawn && targetSquare.endsWith("8")) ||
        (isBlackPawn && targetSquare.endsWith("1"));

      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
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
        onPieceDrop,
    };
}