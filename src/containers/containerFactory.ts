import Docker from 'dockerode';

async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker();

    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // to enable input streams
        AttachStdout: true, // to enable output streams
        AttachStderr: true, // to enable error streams
        Tty: false,
        OpenStdin: true, // keep the input stream open even no interaction is there
        HostConfig: {
            Memory : 20 * 1024 * 1024,  // 20 mb of ram
            CpuShares: 50, 
            PidsLimit: 4, // 4 process creation allowed (This will prevent fork bomb to happen)
            AutoRemove: true  // remove the container automatically when it is stopped
        }
    });

    return container;
}

export default createContainer;