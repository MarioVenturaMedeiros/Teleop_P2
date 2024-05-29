import React from 'react';
import VideoStream from '../components/camera/camera';
import TurtleBotController from '../components/rosbridge_movement/rosbridge_movement';
import MoveRight from '../components/movimentacao/direita';
import MoveLeft from '../components/movimentacao/esquerda';
import MoveForward from '../components/movimentacao/frente';
import StopButton from '../components/movimentacao/stop';
import TurnoffButton from '../components/turnoffbutton/turnoff';

function TeleopScreen() {
  return (
    <>
      <h1>Teleoperação</h1>
      <VideoStream />
      <TurtleBotController>
            <MoveForward />
            <MoveLeft />
            <StopButton />
            <MoveRight />
            <TurnoffButton />
      </TurtleBotController>
    </>
  );
}

export default TeleopScreen;