import React, { useState } from 'react';

import { createStage } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);
    
    console.log('re-render');
    
    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0});
    }
    
    const startGame = () => {
        // Reset everything
        setStage(createStage());
        resetPlayer();
    }
    
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    }
    
    const dropPlayer = () => {
        drop();
    }
    
    const move = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 37:
                    movePlayer(-1);
                    break;
                case 39:
                    movePlayer(1);
                    break;
                case 40:
                    dropPlayer();
                    break;
                default:
                    break;
            }
        }
    }
    
    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text='Level' />
                        </div>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;