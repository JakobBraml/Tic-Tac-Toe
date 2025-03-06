/*import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/

"use client";
import { useState } from "react";

function Square({ value, onClick}) {
    return <button className="square" onClick={onClick}>
        {value}
    </button>

}

function Board({ squares, xIsNext, onPlay}) {
  function onSquareClick(idx) {
    if (squares[idx] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[idx] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);

    return (
    <>
      {winner ? (
        <p>Winner is: {winner}</p>
      ) : (
        <p>Next Player: {xIsNext ? "X" : "O"}</p>
      )}
        <div className="board-row">
            <Square value={squares[0]} onClick={() => onSquareClick(0)}/>
            <Square value={squares[1]} onClick={() => onSquareClick(1)}/>
            <Square value={squares[2]} onClick={() => onSquareClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onClick={() => onSquareClick(3)}/>
            <Square value={squares[4]} onClick={() => onSquareClick(4)}/>
            <Square value={squares[5]} onClick={() => onSquareClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onClick={() => onSquareClick(6)}/>
            <Square value={squares[7]} onClick={() => onSquareClick(7)}/>
            <Square value={squares[8]} onClick={() => onSquareClick(8)}/>
        </div>
    </>
    );
}

function calculateWinner(squares) {
  const lines = [//cont. array
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {//for loop
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default function Game() {
const [history, setHistory] = useState([Array(9).fill(null)]);
const [currentMove, setCurrrentMove] = useState(0);
const xIsNext = currentMove % 2 == 0;
const currentSquares = history[currentMove];

function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrrentMove(nextHistory.length - 1);
}

function jumpTo(nextMove) {
  setCurrrentMove(nextMove);
}

const moves = history.map((squares, move) => {
  let description;
  if (move > 0) {
    description = "Go to move # " + move;
  } else {
    description = "Go to game start";
  }
  return (
    <li key={move + Math.random()}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );

});

    return ( 
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
    </div>
    );
}