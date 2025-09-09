import { useRef, useState, useCallback } from "react";
import { Chess } from "chess.js";
import { type PieceDropHandlerArgs } from "react-chessboard";

export function useChessGame() {
    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());
    const [turn, setTurn] = useState(gameRef.current.turn());

    const onPieceDrop = useCallback(
      async ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): Promise<boolean> => {
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
      
      try {
        const aiMove = await fetchNextMove(game.fen());
        game.move({ from: aiMove.from, to: aiMove.to, promotion: aiMove.promotion });
        setFen(game.fen());
        setTurn(game.turn());
      } catch (err) {
        console.error("Failed to get next move " + err);
      }
      
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

async function fetchNextMove(fen: string) {
  const response = await fetch("http://localhost:5000/nextmove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ fen })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch next move");
  }
  
  return response.json();
}