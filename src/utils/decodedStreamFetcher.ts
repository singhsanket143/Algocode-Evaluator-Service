import decodeDockerStream from '../containers/dockerHelper';

export default function fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
    return new Promise((res, rej) => {
        loggerStream.on('end', () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            if(decodedStream.stderr) {
                rej(decodedStream.stderr);
            } else {
                res(decodedStream.stdout);
            }
        });
    });
}