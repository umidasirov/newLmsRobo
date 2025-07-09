import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import * as monaco from "monaco-editor";
import FileUpload from "../fileUpload";
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';

export default function PistonCompiler() {
    const [code, setCode] = useState("print('Salom, dunyo!')");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState("python3");

    const langMap = {
        python3: "python",
        javascript: "javascript",
        cpp: "cpp",
        java: "java",
        html: "html"
    };

    function ClearAll(e) {
        setCode('');
        setOutput('');
        setLang(e.target.value);
    }

    const runCode = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language: lang,
                version: "*",
                files: [{ content: code }],
            });
            setOutput(response.data.run.output || "No output");
        } catch (error) {
            setOutput("Xatolik: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-sm:p-2 mx-auto w-[100%]">
            <div className="mb-4 w-full items-center flex justify-between">
                <div className="w-[150px] h-[40px]">
                    <select
                        value={lang}
                        onChange={(e) => ClearAll(e)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 h-[40px]"
                    >
                        <option value="python3">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="html">HTML</option>
                    </select>
                </div>
                <button
                    onClick={runCode}
                    className="h-[40px] w-[100px] p-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Ishlamoqda..." : "Run"}
                </button>
            </div>

            <div className="bg-[#1e1e1e] py-2">
                <h1 className="mt-2 text-gray-100 pl-[3%] my-[5px]"><strong>{lang}</strong></h1>

                <div className="rounded h-full">
                    <Editor
                        height="400px"
                        language={langMap[lang]}
                        value={code}
                        onChange={(value) => setCode(value)}
                        theme="vs-dark"
                    />
                </div>

                <div className="p-4 rounded bg-[#1e1e1e] text-gray-100 rounded">
                    {lang !== 'html' ? (
                        <div className="bg-black text-green-400 p-3 h-[100px] overflow-y-autofont-mono text-sm">
                            <pre className="whitespace-pre-wrap break-words">{output}</pre>
                        </div>
                    ) : (
                        <div className="mt-4 text-green-100">
                            <h2 className="text-lg font-semibold mb-2">HTML Preview:</h2>
                            <iframe
                                title="HTML Preview"
                                srcDoc={code}
                                sandbox="allow-scripts allow-same-origin"
                                className="w-full h-96 border rounded bg-white"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="buttons gap-2 flex items-center m-4 ml-0 max-sm:flex-col max-sm:items-center max-sm:w-full">
                <button
                    onClick={() => setOutput('')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3 max-sm:w-[100%] max-sm:mr-0"
                    disabled={loading}
                >
                    Natijani tozalash
                </button>

                <button
                    onClick={() => setCode('')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3 max-sm:w-[100%] max-sm:mr-0"
                    disabled={loading}
                >
                    Codni tozalash
                </button>

                <FileUpload />
            </div>
        </div>
    );
}
