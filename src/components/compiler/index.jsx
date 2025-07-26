import { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import Editor from "@monaco-editor/react";

export default function CodeSubmitter({ id }) {
    const [code, setCode] = useState("print('Salom, dunyo!')");
    const [language, setLanguage] = useState("python3");
    const [file, setFile] = useState(null);
    const [lessonId, setLessonId] = useState(id);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [parsedOutput,setParsedOutput] = useState({})
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = [
        "text/x-python", "text/javascript", "text/html", "text/css", "application/json",
        "text/markdown", "text/x-c++src", "text/x-csrc", "application/x-typescript", "text/plain"
    ];


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setError("Faqat dasturlashga oid fayllar yuklanadi (.py, .js, .html, va h.k.)");
            return;
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setError("Fayl hajmi 5MB dan oshmasligi kerak.");
            return;
        }

        setError("");
        setFile(selectedFile);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setOutput("");
        try {
            const formData = new FormData();
            if (file) formData.append("file", file);
            formData.append("lesson_id", lessonId);
            formData.append("user_code", code);
            formData.append("language", language);

            const token = localStorage.getItem("token"); // tokenni olish

            const response = await axios.post("https://api.myrobo.uz/api/handle-code-lesson/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            setOutput(response.data);
            // setParsedOutput(JSON.parse(output)
        } catch (err) {
            setOutput("Xatolik: " + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    };

    console.log(output);
    
    return (
        <div className="p-6 max-md:p-1">
            {/* Tanlash paneli */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="python3">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="html">HTML</option>
                </select>

                {/* <input
                    type="text"
                    value={lessonId}
                    onChange={(e) => setLessonId(e.target.value)}
                    className="p-2 border rounded"
                    placeholder="Dars ID (lesson_id)"
                /> */}

                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                    <UploadOutlined />
                    <span>Faylni tanlang</span>
                    <input
                        type="file"
                        accept=".py,.js,.html,.css,.json,.ts,.cpp,.c,.md,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            </div>

            {file && <p className="text-blue-500">Fayl tanlandi: {file.name}</p>}
            {error && <p className="text-red-600">{error}</p>}

            {/* VS Code style Editor */}
            <div className="py-6 max-md:p-1 border rounded-s overflow-hidden mb-4 bg-[#1e1e1e]">
                <Editor
                    height="400px"
                    language={language === "python3" ? "python" : language}
                    value={code}
                    onChange={(val) => setCode(val)}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        lineNumbers: "on",
                        minimap: { enabled: false }
                    }}
                />
                {/* Natija */}
                <div className="p-4 bg-[#1e1e1e] text-green-400 font-mono text-sm border-t min-h-[100px] whitespace-pre-wrap break-words">
                    {output.output}
                </div>
            </div>

            {/* Tugmalar */}
            <div className="flex gap-3 mb-4">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Yuborilmoqda..." : "Yuborish"}
                </button>

                <button
                    onClick={() => {
                        setCode("");
                        setOutput("");
                        setFile(null);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Tozalash
                </button>
            </div>

        </div>
    );
}
