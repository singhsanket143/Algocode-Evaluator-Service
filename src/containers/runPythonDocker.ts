// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import { EXECUTION_TIMEOUT_SECOND, PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';


async function runPython(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("Initialising a new python docker container");
    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    console.log(runCommand);
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']); 
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 


    // starting / booting the corresponding docker container
    await pythonDockerContainer.start();

    const timeoutHandler = setTimeout(async() => {
        try {
            await pythonDockerContainer.stop();
            console.log("Execution Timed Out");
        } catch (err) {
            console.error("Error removing/stopping container: ",err);
        }
    }, EXECUTION_TIMEOUT_SECOND * 1000);

    console.log("Started the docker container");

    const loggerStream = await pythonDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    });
    
    // Attach events on the stream objects to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk);
    });

    await new Promise((res) => {
        loggerStream.on('end', () => {
            clearTimeout(timeoutHandler);
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodeDockerStream);
        });
    });
    
    // remove the container when done with it
    await pythonDockerContainer.remove();

}       

export default runPython;