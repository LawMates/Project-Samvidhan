import { useState, useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface WordSearchGameProps {
  words: string[];
  onWordFound: (word: string) => void;
  onAllWordsFound: () => void;
}

interface Cell {
  letter: string;
  row: number;
  col: number;
}

interface FoundWord {
  word: string;
  cells: { row: number; col: number }[];
}

type Direction = [number, number];

const DIRECTIONS: Direction[] = [
  [0, 1],   // right
  [1, 0],   // down
  [1, 1],   // diagonal down-right
  [-1, 1],  // diagonal up-right
  [0, -1],  // left
  [-1, 0],  // up
  [-1, -1], // diagonal up-left
  [1, -1],  // diagonal down-left
];

const GRID_SIZE = 12;

const generateGrid = (words: string[]): { grid: string[][]; wordPositions: Map<string, { row: number; col: number }[]> } => {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  const wordPositions = new Map<string, { row: number; col: number }[]>();

  const placeWord = (word: string): boolean => {
    const shuffledDirections = [...DIRECTIONS].sort(() => Math.random() - 0.5);
    
    for (let attempts = 0; attempts < 100; attempts++) {
      const direction = shuffledDirections[attempts % shuffledDirections.length];
      const [dr, dc] = direction;
      
      const maxRow = dr === 0 ? GRID_SIZE : dr > 0 ? GRID_SIZE - word.length : GRID_SIZE - 1;
      const minRow = dr === 0 ? 0 : dr > 0 ? 0 : word.length - 1;
      const maxCol = dc === 0 ? GRID_SIZE : dc > 0 ? GRID_SIZE - word.length : GRID_SIZE - 1;
      const minCol = dc === 0 ? 0 : dc > 0 ? 0 : word.length - 1;

      if (maxRow < minRow || maxCol < minCol) continue;

      const startRow = Math.floor(Math.random() * (maxRow - minRow + 1)) + minRow;
      const startCol = Math.floor(Math.random() * (maxCol - minCol + 1)) + minCol;

      let canPlace = true;
      const positions: { row: number; col: number }[] = [];

      for (let i = 0; i < word.length; i++) {
        const row = startRow + i * dr;
        const col = startCol + i * dc;

        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
          canPlace = false;
          break;
        }

        if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
          canPlace = false;
          break;
        }

        positions.push({ row, col });
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          grid[positions[i].row][positions[i].col] = word[i];
        }
        wordPositions.set(word, positions);
        return true;
      }
    }
    return false;
  };

  // Sort words by length (longer first) for better placement
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  
  for (const word of sortedWords) {
    placeWord(word.toUpperCase());
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, wordPositions };
};

export const WordSearchGame = ({ words, onWordFound, onAllWordsFound }: WordSearchGameProps) => {
  // Create a stable key from words to only regenerate when words actually change
  const wordsKey = useMemo(() => words.join(','), [words]);
  
  const { grid, wordPositions } = useMemo(() => {
    return generateGrid(words);
  }, [wordsKey]);

  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);

  const getCellsInLine = useCallback((start: { row: number; col: number }, end: { row: number; col: number }): { row: number; col: number }[] => {
    const cells: { row: number; col: number }[] = [];
    const dr = Math.sign(end.row - start.row);
    const dc = Math.sign(end.col - start.col);
    
    // Only allow straight lines (horizontal, vertical, diagonal)
    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
    
    if (rowDiff !== 0 && colDiff !== 0 && rowDiff !== colDiff) {
      return [start]; // Not a valid line, return just start
    }

    const steps = Math.max(rowDiff, colDiff);
    
    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: start.row + i * dr,
        col: start.col + i * dc,
      });
    }
    
    return cells;
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    setSelecting(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (selecting && startCell) {
      const cells = getCellsInLine(startCell, { row, col });
      setSelectedCells(cells);
    }
  };

  const handleMouseUp = () => {
    if (selecting && selectedCells.length > 1) {
      // Get the selected word
      const selectedWord = selectedCells.map(c => grid[c.row]?.[c.col] || '').join('');
      const reversedWord = selectedWord.split('').reverse().join('');
      
      // Check if this word is in our word list
      const matchedWord = words.find(w => 
        w.toUpperCase() === selectedWord || w.toUpperCase() === reversedWord
      );

      if (matchedWord && !foundWords.find(f => f.word === matchedWord.toUpperCase())) {
        const newFoundWord: FoundWord = {
          word: matchedWord.toUpperCase(),
          cells: [...selectedCells],
        };
        setFoundWords(prev => [...prev, newFoundWord]);
        onWordFound(matchedWord);
        toast.success(`Found: ${matchedWord}!`);

        // Check if all words are found
        if (foundWords.length + 1 === words.length) {
          setTimeout(onAllWordsFound, 500);
        }
      }
    }
    
    setSelecting(false);
    setStartCell(null);
    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(c => c.row === row && c.col === col);
  };

  const isCellFound = (row: number, col: number) => {
    return foundWords.some(fw => fw.cells.some(c => c.row === row && c.col === col));
  };

  const getFoundWordColor = (row: number, col: number) => {
    const foundIndex = foundWords.findIndex(fw => 
      fw.cells.some(c => c.row === row && c.col === col)
    );
    if (foundIndex === -1) return '';
    
    const colors = [
      'bg-green-500/30',
      'bg-blue-500/30',
      'bg-purple-500/30',
      'bg-orange-500/30',
      'bg-pink-500/30',
      'bg-cyan-500/30',
      'bg-yellow-500/30',
      'bg-red-500/30',
    ];
    return colors[foundIndex % colors.length];
  };

  if (grid.length === 0) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
      {/* Word Search Grid */}
      <div 
        className="select-none touch-none"
        onMouseLeave={() => {
          if (selecting) {
            handleMouseUp();
          }
        }}
      >
        <div 
          className="grid gap-0.5 bg-muted p-2 rounded-lg shadow-inner"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => {
              const isSelected = isCellSelected(rowIndex, colIndex);
              const isFound = isCellFound(rowIndex, colIndex);
              const foundColor = getFoundWordColor(rowIndex, colIndex);

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9
                    flex items-center justify-center
                    font-mono font-bold text-sm sm:text-base
                    cursor-pointer rounded
                    transition-all duration-150
                    ${isSelected ? 'bg-primary text-primary-foreground scale-110' : ''}
                    ${isFound && !isSelected ? foundColor : ''}
                    ${!isSelected && !isFound ? 'bg-card hover:bg-accent' : ''}
                  `}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                  onTouchStart={() => handleMouseDown(rowIndex, colIndex)}
                  onTouchEnd={handleMouseUp}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Click and drag to select words
        </p>
      </div>

      {/* Word List */}
      <div className="w-full lg:w-48 space-y-2">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Words to Find ({foundWords.length}/{words.length})
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {words.map((word) => {
            const isFound = foundWords.some(f => f.word === word.toUpperCase());
            return (
              <Badge
                key={word}
                variant={isFound ? "default" : "outline"}
                className={`
                  justify-between gap-2 py-1.5 px-3
                  ${isFound ? 'bg-secondary text-secondary-foreground line-through opacity-70' : ''}
                `}
              >
                {word.toUpperCase()}
                {isFound && <Check className="w-3 h-3" />}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};
