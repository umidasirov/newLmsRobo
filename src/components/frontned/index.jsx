import React, { useState } from "react";
import { Card, Button } from "antd";
import {
  PlayCircleFilled,
  BookFilled,
  CheckCircleFilled,
  SendOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useData } from "../../datacontect";
import { useLocation } from "react-router-dom";
import CodeSubmitter from "../compiler";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const FrontendCourse = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubLesson, setSelectedSubLesson] = useState(null);
  const [expandedItems, setExpandedItems] = useState({
    section: null,
    lesson: null,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const { data } = useData();
  const location = useLocation();
  const id = location?.state?.id;
  const findData = data.find((item) => item?.id === id);

  // Notes state
  const [notes, setNotes] = useState("");
  const [list, setList] = useState([]);

  const addNote = () => {
    if (!notes.trim()) {
      toast.error("❌ Bo‘sh eslatma qo‘shib bo‘lmaydi!");
      return;
    }
    setList((prev) => [...prev, notes]);
    setNotes("");
    toast.success("✅ Eslatma qo‘shildi!");
  };

  const deleteNote = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
    toast.info("🗑️ Eslatma o‘chirildi!");
  };


  // --- qo'shamiz ---
  const isFirstLesson = (() => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return true;

    const lessons = selectedSection.lessons;
    const lessonIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const subLessons = selectedLesson.lessons;
    const subIndex = subLessons.findIndex((s) => s.id === selectedSubLesson.id);

    return lessonIndex === 0 && subIndex === 0;
  })();

  const isLastLesson = (() => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return true;

    const lessons = selectedSection.lessons;
    const lessonIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const subLessons = selectedLesson.lessons;
    const subIndex = subLessons.findIndex((s) => s.id === selectedSubLesson.id);

    return (
      lessonIndex === lessons.length - 1 &&
      subIndex === subLessons.length - 1
    );
  })();



  // Navigation handlers
  const handleSectionClick = (section) => {
    setExpandedItems((prev) => ({
      section: prev.section === section.id ? null : section.id,
      lesson: null,
    }));

    if (expandedItems.section !== section.id) {
      setSelectedSection(section);
      if (section.lessons?.length > 0) {
        const firstLesson = section.lessons[0];
        setSelectedLesson(firstLesson);
        setSelectedSubLesson(firstLesson.lessons?.[0] || null);
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
      setSelectedSubLesson(lesson.lessons?.[0] || null);
    }
  };

  const goToNextLesson = () => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return;

    const lessons = selectedSection.lessons;
    const lessonIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const subLessons = selectedLesson.lessons;
    const subIndex = subLessons.findIndex((s) => s.id === selectedSubLesson.id);

    if (subIndex < subLessons.length - 1) {
      setSelectedSubLesson(subLessons[subIndex + 1]);
    } else if (lessonIndex < lessons.length - 1) {
      const nextLesson = lessons[lessonIndex + 1];
      setSelectedLesson(nextLesson);
      setExpandedItems((p) => ({ ...p, lesson: nextLesson.id }));
      setSelectedSubLesson(nextLesson.lessons?.[0] || null);
    } else {
      toast.success("🎉 Tabriklaymiz! Kursni tugatdingiz!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleFinishModule = () => {
    toast.success("🎉 Tabriklaymiz! Modulni tugatdingiz!");
    setShowConfetti(true);

    // Keyingi modulga o'tish
    const sections = findData?.lesson_bigs || [];
    const currentSectionIndex = sections.findIndex((s) => s.id === selectedSection?.id);

    // Agar keyingi modul (section) mavjud bo'lsa, unga o'tamiz
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      setTimeout(() => {
        setShowConfetti(false);
        setSelectedSection(nextSection);
        setExpandedItems({ section: nextSection.id, lesson: null });
        if (nextSection.lessons?.length > 0) {
          const firstLesson = nextSection.lessons[0];
          setSelectedLesson(firstLesson);
          setSelectedSubLesson(firstLesson.lessons?.[0] || null);
        }
      }, 2500);
    } else {
      // Kurs tugadi
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const goToPrevLesson = () => {
    if (!selectedSection || !selectedLesson || !selectedSubLesson) return;

    const lessons = selectedSection.lessons;
    const lessonIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const subLessons = selectedLesson.lessons;
    const subIndex = subLessons.findIndex((s) => s.id === selectedSubLesson.id);

    if (subIndex > 0) {
      setSelectedSubLesson(subLessons[subIndex - 1]);
    } else if (lessonIndex > 0) {
      const prevLesson = lessons[lessonIndex - 1];
      setSelectedLesson(prevLesson);
      setExpandedItems((p) => ({ ...p, lesson: prevLesson.id }));
      setSelectedSubLesson(prevLesson.lessons[prevLesson.lessons.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 relative">
      {showConfetti && <Confetti />}

      {/* GRID layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - 1/4 */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-4 rounded-xl shadow-xl overflow-y-auto max-h-[85vh]"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
            {findData?.title || "Frontend Kursi"}
          </h1>

          {findData?.lesson_bigs?.map((section) => (
            <div key={section.id} className="mb-2">
              <div
                className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 ${selectedSection?.id === section.id
                  ? "bg-indigo-100 text-blue-700"
                  : "hover:bg-indigo-50"
                  }`}
                onClick={() => handleSectionClick(section)}
              >
                <PlayCircleFilled className="text-blue-500" />
                <span>{section.title}</span>
              </div>

              <AnimatePresence>
                {expandedItems.section === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-4 mt-2"
                  >
                    {section.lessons?.map((lesson) => (
                      <div key={lesson.id}>
                        <div
                          onClick={() => handleLessonClick(lesson)}
                          className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${selectedLesson?.id === lesson.id
                            ? "bg-blue-100"
                            : "hover:bg-blue-50"
                            }`}
                        >
                          <span>{lesson.title}</span>
                          <div className="w-14 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="bg-green-500 h-2"
                              style={{ width: `${lesson.progress || 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Yangi: Sub-lessons uchun kichikroq vkladka */}
                        {selectedLesson?.id === lesson.id && lesson.lessons?.length > 1 && (
                          <div className="ml-4 mt-1">
                            {lesson.lessons.map((sub) => (
                              <div
                                key={sub.id}
                                onClick={() => setSelectedSubLesson(sub)}
                                className={`p-2 rounded cursor-pointer flex items-center gap-2 text-sm transition-all duration-200 ${selectedSubLesson?.id === sub.id
                                  ? "bg-blue-100 text-blue-600"
                                  : "hover:bg-blue-50"
                                  }`}
                              >
                                <BookFilled className="text-blue-500" />
                                <span>{sub.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Player & Content - 2/4 */}
        <div className="lg:col-span-2 order-last lg:order-none">
          {selectedSubLesson ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={selectedSubLesson.id}
            >
              <Card
                title={selectedSubLesson.title}
                className="shadow-lg rounded-xl overflow-hidden"
              >
                {selectedSubLesson.video_url && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <ReactPlayer
                      url={selectedSubLesson.video_url}
                      width="100%"
                      height="400px"
                      controls
                    />
                  </div>
                )}

                <p className="mb-4">{selectedSubLesson.description}</p>

                {selectedSubLesson.lesson_content?.map((content) => (
                  <div key={content.id} className="mb-4">
                    <h4 className="font-semibold">{content.title}</h4>
                    {content.lesson_sentence?.map((s) => (
                      <div key={s.id} className="ml-2 mb-2">
                        <p className="font-medium">{s.title}</p>
                        <p>{s.about}</p>
                      </div>
                    ))}
                  </div>
                ))}

                {selectedSubLesson.status !== "content" && (
                  <div className="border border-gray-200 rounded p-2 mt-4">
                    <CodeSubmitter id={id} />
                  </div>
                )}
              </Card>

              {/* Navigation */}
              <div className="flex justify-between mt-4 flex-wrap gap-2">
                <Button
                  type="primary"
                  icon={<BookFilled />}
                  onClick={goToPrevLesson}
                  disabled={isFirstLesson}   // 🔹 qo'shildi
                >
                  Oldingi
                </Button>
                <Button
                  type="primary"
                  icon={<CheckCircleFilled />}
                  onClick={isLastLesson ? handleFinishModule : goToNextLesson}
                >
                  {isLastLesson ? "Modulni tugatish" : "Keyingi"}
                </Button>
              </div>

            </motion.div>
          ) : (
            <Card title="Darsni tanlang" className="shadow-lg">
              <div className="text-center py-8 text-gray-500">
                Chap menyudan darsni tanlang 📚
              </div>
            </Card>
          )}
        </div>

        {/* Notes - 1/4 */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-4 rounded-xl shadow-xl flex flex-col order-2 lg:order-none"
        >
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            📝 Eslatmalar
          </h2>

          {/* Input + Samolyotcha tugma */}
          <div className="flex gap-2">
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Bu yerda eslatmalaringizni yozishingiz mumkin..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={addNote}
            />
          </div>

          {/* Qo‘shilgan eslatmalar listi */}
          <div className="mt-4 flex-1 overflow-y-auto max-h-[40vh] pr-2">
            {list.length === 0 ? (
              <p className="text-gray-400 text-center mt-6">
                Hozircha eslatma yo‘q ✍️
              </p>
            ) : (
              list.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 mb-2 shadow-sm"
                >
                  <span className="text-sm break-words w-[85%]">{item}</span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteNote(index)}
                  />
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FrontendCourse;
