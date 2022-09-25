import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ScannerScreen } from './Screen/Scanner.screen';

function App() {
  return (
    <div className="App">
      <h1>Camera Scanner - ORIGAMI</h1>
      <ScannerScreen 
        showLogsOnConsole={true}
        onTextRecognize={(text) => console.log('texto: ', text)}
        isFullscreen={false}
        isImageMirror={false}
        imageType={'png'}
        onCameraStart={() => {return {}}}
        onCameraStop={() => {return {}}}
        onCameraError={() => {return {}}}
      />
    </div>
  );
}

export default App;
