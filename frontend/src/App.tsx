import { useState } from 'react'
import { Chess, Move, type Piece } from 'chess.js'
import { Chessboard, type ChessboardOptions } from 'react-chessboard'
import './App.css'

function App() {
  const [game, setGame] = useState(new Chess())
  const chessboardOptions: ChessboardOptions = {
      position: game.fen(),
      onPieceDrop: onDrop,
      boardWidth: 600
  }
  const makeMove = (move: { from: string; to: string; promotion?: string }): Move | null => {
    const newGame = new Chess(game.fen())
    const result = newGame.move(move);

    if (result) {
      setGame(newGame)
    }
    return result
  }

  const onDrop = (piece: Piece, sourceSquare: string, targetSquare: string): boolean => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // auto-promote for now
    };
    const result = makeMove(move);
    return result != null;
  }

  return (
    <Chessboard 
      options={chessboardOptions}
       />
  )
}

export default App
