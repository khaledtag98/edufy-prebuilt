import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import uploadToS3 from "./uploadToS3";
const RECORD_DURATION = 10000;
const periodicStreamRecorder = async () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(async function (stream) {
        let recorder = RecordRTC(stream, {
            type: 'video',
            mimeType: 'video/webm;codecs=vp9',
        });
        recorder.startRecording();

        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(RECORD_DURATION);

        recorder.stopRecording(() => {
            let blob = recorder.getBlob(); // recorded video file
            console.log(blob);
            uploadToS3(blob);
            // invokeSaveAsDialog(blob); // download the file locally 

        });
    });

}
export default periodicStreamRecorder