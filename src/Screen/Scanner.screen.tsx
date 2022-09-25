import React from "react";
//@ts-ignore
import Camera, {FACING_MODES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css';
import { createWorker } from "tesseract.js";

interface Props {
    showLogsOnConsole: boolean, 
    onTextRecognize: (text: any) => void,
    isFullscreen: boolean,
    isImageMirror: boolean,
    imageType: string, 
    onCameraStart: () => {},
    onCameraStop: () => {}, 
    onCameraError: () => {}
}

export const ScannerScreen:React.FunctionComponent<Props> = (props: Props) => {

    const handleTakePhoto = (dataUri: string) => {
        doOCR(dataUri)
    }

    const worker = createWorker({
        logger: m => {if(props.showLogsOnConsole) {console.log(m)}}
    })

    const doOCR = async(imageData: any) => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageData);
        props.onTextRecognize(text)
    }

    return(<>
    <Camera 
        onTakePhoto = { (dataUri:string) => { handleTakePhoto(dataUri); } }>
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        isFullscreen= {props.isFullscreen}
        isImageMirror= {props.isImageMirror}
        imageType= {props.imageType}
        onCameraStart= {props.onCameraStart}
        onCameraStop= {props.onCameraStop}
        onCameraError= {props.onCameraError}
    </Camera>
    </>)
}