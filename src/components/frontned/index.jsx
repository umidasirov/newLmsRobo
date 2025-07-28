import React, { useState } from "react";
import { Card, Divider, Button } from "antd";
import {
  PlayCircleFilled,
  BookFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useData } from "../../datacontect";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import PistonCompiler from "../compiler";
import CodeSubmitter from "../compiler";
const FrontendCourse = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null);
  const [expandedItems, setExpandedItems] = useState({
    section: null,
    lesson: null,
  });


  const [code, setCode] = useState("# Kodni shu yerga yozing");
  const [output, setOutput] = useState("");

  const handleRun = () => {
    try {
      const result = eval(code);
      setOutput(result !== undefined ? String(result) : "✅ Kod bajarildi");
    } catch (err) {
      setOutput("❌ Xatolik: " + err.message);
    }
  };


  const { data } = useData();
  const location = useLocation();
  const { id } = location?.state;
  const findData = data.find((item) => item?.id === id);
  console.log(data);
  console.log("kerakli", findData.lesson_bigs[1].lessons[0].lessons[0].status);
  console.log("kerakli", findData);

  const handleSectionClick = (section) => {
    setExpandedItems((prev) => ({
      section: prev.section === section.id ? null : section.id,
      lesson: null,
    }));

    if (expandedItems.section !== section.id) {
      setSelectedSection(section);
      if (section.lessons && section.lessons.length > 0) {
        const firstLesson = section.lessons[0];
        setSelectedLesson(firstLesson);

        if (firstLesson.lessons && firstLesson.lessons.length > 0) {
          setSelectedSubLesson(firstLesson.lessons[0]);
        } else {
          setSelectedSubLesson(null);
        }
      } else {
        setSelectedLesson(null);
        setSelectedSubLesson(null);
      }
    }
  };

  const handleLessonClick = (lesson) => {
    setExpandedItems((prev) => ({
      ...prev,
      lesson: prev.lesson === lesson.id ? null : lesson.id,
    }));

    if (expandedItems.lesson !== lesson.id) {
      setSelectedLesson(lesson);
      if (lesson.lessons && lesson.lessons.length > 0) {
        setSelectedSubLesson(lesson.lessons[0]);
      } else {
        setSelectedSubLesson(null);
      }
    }
  };

  const handleSubLessonSelect = (subLesson) => {
    setSelectedSubLesson(subLesson);
  };

  const goToNextLesson = () => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return;

    const currentLessons = selectedSection.lessons;
    const currentLessonIndex = currentLessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );

    const currentSubLessons = selectedLesson.lessons;
    const currentSubLessonIndex = currentSubLessons.findIndex(
      (subLesson) => subLesson.id === selectedSubLesson.id
    );

    if (currentSubLessonIndex < currentSubLessons.length - 1) {
      setSelectedSubLesson(currentSubLessons[currentSubLessonIndex + 1]);
    } else if (currentLessonIndex < currentLessons.length - 1) {
      const nextLesson = currentLessons[currentLessonIndex + 1];
      setSelectedLesson(nextLesson);
      setExpandedItems((prev) => ({
        ...prev,
        lesson: nextLesson.id,
      }));

      if (nextLesson.lessons[0]) {
        setSelectedSubLesson(nextLesson.lessons[0]);
      }
    }
  };

  const goToPrevLesson = () => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return;

    const currentLessons = selectedSection.lessons;
    const currentLessonIndex = currentLessons.findIndex(
      (lesson) => lesson.id === selectedLesson.id
    );

    const currentSubLessons = selectedLesson.lessons;
    const currentSubLessonIndex = currentSubLessons.findIndex(
      (subLesson) => subLesson.id === selectedSubLesson.id
    );

    if (currentSubLessonIndex > 0) {
      setSelectedSubLesson(currentSubLessons[currentSubLessonIndex - 1]);
    } else if (currentLessonIndex > 0) {
      const prevLesson = currentLessons[currentLessonIndex - 1];
      setSelectedLesson(prevLesson);
      setExpandedItems((prev) => ({
        ...prev,
        lesson: prevLesson.id,
      }));

      if (prevLesson.lessons.length > 0) {
        setSelectedSubLesson(prevLesson.lessons[prevLesson.lessons.length - 1]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-sm:p-2 pt-0 w-[100%]">
      <div className="mx-auto w-[100%]">
        <div className="text-center mb-8">
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-[100%]">
          <div className="w-full lg:w-2/6 bg-white p-4 rounded-lg shadow max-sm:p-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {findData?.title || "Frontend Dasturlash Kursi"}
            </h1>
            <div className="space-y-2">
              {findData?.lesson_bigs?.map((section) => (
                <div key={section.id} className="border-b">
                  <div
                    className={`flex border-b border-r items-center p-2 hover:bg-blue-50 rounded cursor-pointer ${selectedSection?.id === section.id
                      ? "bg-blue-100 font-medium"
                      : ""
                      }`}
                    onClick={() => handleSectionClick(section)}
                  >
                    <PlayCircleFilled className="text-blue-500 mr-2" />
                    <span>{section.title}</span>
                  </div>

                  {expandedItems.section === section.id && (
                    <div className="ml-6 space-y-1">
                      {section.lessons.map((lesson) => (
                        <div key={lesson.id}>
                          <div
                            className={`flex items-center p-2 hover:bg-blue-50 rounded cursor-pointer ${selectedLesson?.id === lesson.id
                              ? "bg-blue-200 font-medium"
                              : ""
                              }`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <span className="text-sm">{lesson.title}</span>
                          </div>

                          {expandedItems.lesson === lesson.id && (
                            <div className="ml-4 space-y-1">
                              {lesson.lessons.map((subLesson) => (
                                <div
                                  key={subLesson.id}
                                  className={`flex items-center p-2 hover:bg-blue-50 rounded cursor-pointer ${selectedSubLesson?.id === subLesson.id
                                    ? "bg-blue-300 font-medium"
                                    : ""
                                    }`}
                                  onClick={() =>
                                    handleSubLessonSelect(subLesson)
                                  }
                                >
                                  <span className="text-xs">
                                    {subLesson.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-5/6">
            {selectedSubLesson ? (
              <>
                <Card title={selectedSubLesson.title} className="mb-6 shadow">
                    {/* {selectedSubLesson.video_url ? (
                      <ReactPlayer
                        url={selectedSubLesson.video_url}
                        width="100%"
                        height="100%"
                        controls
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center rounded">
                        <PlayCircleFilled className="text-5xl text-blue-500" />
                      </div>
                    )} */}
                    {selectedSubLesson.video_url && (
                      <div className="aspect-w-16 aspect-h-9 mb-4 w-full h-[600px] max-sm:h-[196px]">
                        <ReactPlayer
                          url={selectedSubLesson.video_url}
                          width="100%"
                          height="100%"
                          controls
                        />
                      </div>
                    )}

                  {/* Dars boyicha */}
                  <div className="prose max-w-none">
                    <p className="mb-4">{selectedSubLesson.description}</p>
                    <br />
                    {selectedSubLesson.lesson_content?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-bold text-lg mb-2">
                          Dars tarkibi:
                        </h3>
                        {selectedSubLesson.lesson_content.map((content) => (
                          <div key={content.id} className="mb-4">
                            <h4 className="font-semibold">{content.title}</h4>
                            {content.lesson_sentence.map((sentence) => (
                              <div key={sentence.id} className="ml-2 mb-2">
                                <p className="font-medium">{sentence.title}</p>
                                <p>{sentence.about}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    {/* compiler */}
                    {selectedSubLesson.status !== "content" && (
                      <div className="p-2 border border-gray-200 rounded">
                        <CodeSubmitter id={id} />
                      </div>
                    )}

                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button
                    type="primary"
                    icon={<BookFilled />}
                    onClick={goToPrevLesson}
                    disabled={
                      !selectedSection ||
                      !selectedLesson ||
                      !selectedSubLesson ||
                      (selectedLesson.lessons.findIndex(
                        (subLesson) => subLesson.id === selectedSubLesson.id
                      ) === 0 &&
                        selectedSection.lessons.findIndex(
                          (lesson) => lesson.id === selectedLesson.id
                        ) === 0)
                    }
                  >
                    Oldingi dars
                  </Button>
                  <div className="space-x-2">
                    <Button
                      type="primary"
                      icon={<CheckCircleFilled />}
                      onClick={goToNextLesson}
                      disabled={
                        !selectedSection ||
                        !selectedLesson ||
                        !selectedSubLesson ||
                        (selectedLesson.lessons.findIndex(
                          (subLesson) => subLesson.id === selectedSubLesson.id
                        ) ===
                          selectedLesson.lessons.length - 1 &&
                          selectedSection.lessons.findIndex(
                            (lesson) => lesson.id === selectedLesson.id
                          ) ===
                          selectedSection.lessons.length - 1)
                      }
                    >
                      Keyingi dars
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Card title="Darsni tanlang" className="mb-6 shadow">
                <div className="text-center py-8 text-gray-500">
                  Iltimos, chap menyudan darsni tanlang
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendCourse;
