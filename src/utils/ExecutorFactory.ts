import JavaExecutor from "../containers/javaExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import CodeExecutorStrategy from "../types/CodeExecutorStrategy";

export default function createExecutor(codeLanguage: string | undefined): CodeExecutorStrategy | null {
    if (!codeLanguage) {
        return null;
    }
    const language = codeLanguage.toLowerCase();
    if (language === "python") {
        return new PythonExecutor();
    } else if (language === "java") {
        return new JavaExecutor();
    } else {
        return null;
    }
}
