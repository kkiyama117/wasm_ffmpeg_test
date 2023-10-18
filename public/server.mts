import { readFile, writeFile } from "fs.promises";
import { join } from "path";
import { FFmpeg } from "@ffmpeg.wasm/main";

// ファイル名を定義
const movieName = "movie_" + Math.random().toString(36).slice(-8);
const webmName = movieName + ".webm";
const mp4Name = movieName + ".mp4";
// 動画を生成するMediaRecorder(ffmpegと関係ないため説明は省略)から
// 取得したrecordedBlobsをwebm形式のBlobに変換します
const webmBlob = new Blob(recordedBlobs, { type: "video/webm" });
// webmBlobを8ビット符号なし整数値の配列であるUint8Arrayに変換します
const binaryData = new Uint8Array(await webmBlob.arrayBuffer());
// ffmpeg.wasmでwebm形式の動画データをmp4形式に変換します
const video = await generateMp4Video(binaryData, webmName, mp4Name);
// 返ってきたvideo(Uint8Array)をmp4形式のBlobに変換します
const mp4Blob = new Blob([video], { type: "video/mp4" });
const ffmpeg = await FFmpeg.create({
    core: "@ffmpeg.wasm/core-mt",
    log: true,
});

ffmpeg.fs.writeFile("flame.avi", await readFile(join(assetsDir, "flame.avi")));
await ffmpeg.run("-i", "flame.avi", "flame.mp4");
await writeFile(join(outDir, "flame.mp4"), ffmpeg.fs.readFile("flame.mp4"));

ffmpeg.exit();
process.exit(0);