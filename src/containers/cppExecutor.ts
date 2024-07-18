// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';
import CodeExecutorStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import pullImage from './pullImage';
import fetchDecodedStream from '../utils/decodedStreamFetcher';

class CppExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
        const rawLogBuffer: Buffer[] = [];

        console.log("Initialising a new cpp docker container");
        await pullImage(CPP_IMAGE);
        const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
        console.log(runCommand);
        const cppDockerContainer = await createContainer(CPP_IMAGE, [
            '/bin/sh', 
            '-c',
            runCommand
        ]); 


        // starting / booting the corresponding docker container
        await cppDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await cppDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        
        // Attach events on the stream objects to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse : string = await fetchDecodedStream(loggerStream, rawLogBuffer);
            return {output: codeResponse, status: "COMPLETED"};
        } catch (error) {
            return {output: error as string, status: "ERROR"}
        } finally {
            await cppDockerContainer.remove(); // remove the container when done with it
        }
    }
}

export default CppExecutor;