import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { div } from "framer-motion/client";

export default function PistonCompiler() {
    const [code, setCode] = useState("print('Salom, dunyo!')");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [lang, setLang] = useState("python3");
    console.log("sal");

    const langMap = {
        python3: "python3",
        javascript: "javascript",
        cpp: "cpp",
        java: "java",
        html: "html"
    };
    function ClearAll(e){
        setCode('')
        setOutput('')
        setLang(e.target.value)
    }
    const runCode = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language: lang,
                version: "*", // avtomatik eng so‘nggi versiya
                files: [
                    {
                        content: code,
                    },
                ],
            });

            setOutput(response.data.run.output || "No output");
        } catch (error) {
            setOutput("Xatolik: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Universal Online Compiler (Piston API)</h1>

            {/* Dropdown */}
            <div className="mb-4 w-[250px]" >
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tilni tanlang
                </label>
                <select
                    value={lang}
                    onChange={(e)=> ClearAll(e)}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="python3" onClick={()=>ClearAll()}>Python</option>
                    <option value="javascript" onClick={()=>ClearAll()}>JavaScript</option>
                    <option value="cpp" onClick={()=>ClearAll()}>C++</option>
                    <option value="java" onClick={()=>ClearAll()}>Java</option>
                    <option value="html" onClick={()=> ClearAll()}>HTML</option>
                </select>

                <p className="mt-2 text-gray-600">Tanlangan til: <strong>{lang}</strong></p>
            </div>


            {/* Editor */}
            <div className="rounded">
                <Editor
                    height="300px"
                    defaultLanguage={langMap[lang]}
                    value={code}
                    onChange={(value) => setCode(value)}
                    theme="vs-dark"
                />
            </div>

            {/* Run Button */}
            <button
                onClick={runCode}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Ishlamoqda..." : "Run"}
            </button>

            <button
                onClick={() => setOutput('')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3"
                disabled={loading}
            >
                Natijani tozalash
            </button>

            <button
                onClick={() => setCode('')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3"
                disabled={loading}
            >
                Codni tozalash
            </button>


            {/* Output */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
                {lang!='html'?
                    (
                        <div>
                            <h2 className="text-lg font-semibold">Output:</h2>
                            <pre className="whitespace-pre-wrap">{output}</pre>
                        </div>
                    ):(
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">HTML Preview:</h2>
                            <iframe
                                title="HTML Preview"
                                srcDoc={code}
                                sandbox=""
                                className="w-full h-96 border rounded"
                            />
                        </div>
                    )

                }
            </div>
        </div>
    );
}
