# Spaceman

- SE Bootcamp Project 1

## Game Flow

1. Start Game: Initialize the words and status

2. Select Difficulty (optional)

- Difficulty: Easy / Word Length: 4 / Max incorrect guesses: 7

- Difficulty: Medium / Word Length: 7 / Max incorrect guesses: 6

- Difficulty: Hard / Word Length: 10 / Max incorrect guesses: 4

3. Player Action

- Player gains an incorrect number by choosing the wrong letter

- Player gains an incorrect number by doing nothing for 30 seconds (optional)

- Player gains one answer revealed by clicking the hint button (optional)

4. Game Ends

- Player reaches the max incorrect guess number
- When player wins
- When player click "Reset" to restart the game

## Pseudocode

### 1) Constants:

1.1) ltr

1.2) music (optional)

### 2) State variables:

2.1) hiddenWord

2.2) displayWord

2.3) correctGuesses

2.4) incorrectGuesses

2.5) maxGuesses

2.6) gameOver

2.7) timer (optional)

2.8) Sounds (optional)

### 3) Cached elements:

3.1) letterEl (A to Z)

3.2) buttons

3.3) messages

3.4) answerDisplay

### 4) Functions

4.1) gameReset (initialize and call render)

4.2) renderWord

4.3) renderMsg

4.4) gameWin

4.5) gameOver

4.6) gameHint (optional)

### 5) Event Listeners

5.1) function handleClick

## Data

1. Words

- Easy (4 letters) - Star, Wave, Moon

- Medium (7 Letters) - Journey, Pyramid, Mystery, Station

- Hard (10 Letters) - Laboratory, Electricity, Astronauts, Microscope

2. Sounds (optional)

- Game Start

- Game Over

- Game Win

- Correct guesses

- Incorrect guesses

- Hint (optional)

3. Images

- Game Logo
- Spaceman images

## Icebox

- More Difficulty

## ETC

[Figma link](https://www.figma.com/design/ighFkJCANyY1x0JPzX5Xo0/Project-1?node-id=1811-1036&t=kpK7Hj3v9LS2YU4w-1)
