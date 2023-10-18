const message = document.getElementById('message');
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({
    log: true,
    progress: ({ ratio }) => {
        message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
    },
});

(async () => {
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('./test.avi'));
    await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    await fs.promises.writeFile('./test.mp4', ffmpeg.FS('readFile', 'test.mp4'));
    process.exit(0);
})();

//
// const transcode = async ({ target: { files }  }) => {
//     const { name } = files[0];
//     message.innerHTML = 'Loading ffmpeg-core.js';
//     await ffmpeg.load();
//     message.innerHTML = 'Start transcoding';
//     ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
//     await ffmpeg.run('-i', name,  'output.mp4');
//     message.innerHTML = 'Complete transcoding';
//     const data = ffmpeg.FS('readFile', 'output.mp4');
//
//     const video = document.getElementById('output-video');
//     video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
// }
// document.getElementById('uploader').addEventListener('change', transcode);

// function() {
//     const [loaded, setLoaded] = useState(false);
//     const ffmpegRef = useRef(new FFmpeg());
//     const videoRef = useRef(null);
//     const messageRef = useRef(null);
//
//     const load = async () => {
//         const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
//         const ffmpeg = ffmpegRef.current;
//         // Listen to progress event instead of log.
//         ffmpeg.on('progress', ({ progress, time }) => {
//             messageRef.current.innerHTML = `${progress * 100} % (transcoded time: ${time / 1000000} s)`;
//         });
//         // toBlobURL is used to bypass CORS issue, urls with the same
//         // domain can be used directly.
//         await ffmpeg.load({
//             coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
//             wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
//         });
//         setLoaded(true);
//     }
//
//     const transcode = async () => {
//         const ffmpeg = ffmpegRef.current;
//         await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
//         await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
//         const data = await ffmpeg.readFile('output.mp4');
//         videoRef.current.src =
//             URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
//     }
//
//     return (loaded
//             ? (
//                 <>
//                     <video ref={videoRef} controls></video><br/>
//                     <button onClick={transcode}>Transcode webm to mp4</button>
//                     <p ref={messageRef}></p>
//                 </>
//             )
//             : (
//                 <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
//             )
//     );
// }