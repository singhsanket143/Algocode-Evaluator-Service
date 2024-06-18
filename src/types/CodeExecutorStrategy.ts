export default interface CodeExecutorStrategy {
    execute(code: string, inputTestCase: string) : Promise<ExecutionResponse>;
};

export type ExecutionResponse = {output:string, status: string};