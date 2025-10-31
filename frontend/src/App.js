import React, { useState, useRef, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Explanation from "./components/body/Explanation"
import DemographicsForm from "./components/body/DemographicsForm";
import WelcomePage from "./components/body/WelcomePage";
import { motion, AnimatePresence } from "framer-motion";
import MainPage from "./components/body/MainPage";
import { emotions, shuffle } from "./components/helpers/EmotionList";
import { fakeData } from "./components/helpers/MockEmotionData";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const useFakeDataForTestingPurposes = false

function App() {
    const pages = [
        "Welcome",
        "Explanation",
        "Demographics",
        "MainPage",
        "Results"
    ];

    const sessionId = useRef(uuidv4()).current;
    const shuffledEmotions = React.useMemo(() => shuffle([...emotions]), []);
    const [currentEmotion, setCurrentEmotion] = useState(0);

    const [emotionUserResponseList, setEmotionUserResponseList] = useState(null)

    useEffect(() => {
        if (currentEmotion >= shuffledEmotions.length) {
            setCurrentPage("Results");
            return;
        }
        if (useFakeDataForTestingPurposes) {
            setEmotionUserResponseList(fakeData)
        }
        else {
            fetch("http://localhost:8000/emotions/" + shuffledEmotions[currentEmotion])
                .then(res => res.json())
                .then(data => setEmotionUserResponseList(data))
                .catch(err => {
                    console.error(err);
                    setEmotionUserResponseList([]);
                });
        }
    }, [currentEmotion, shuffledEmotions]);

    const nextEmotion = () => {
        setCurrentEmotion((prev) => prev + 1)
    }

    const [currentPage, setCurrentPage] = useState("Welcome");
    const goNext = () => {
        const index = pages.indexOf(currentPage)
        if (index < (pages.length - 1) && index !== -1) {
            setCurrentPage(pages[index + 1]);
        }
    }
    const goBack = () => {
        const index = pages.indexOf(currentPage)
        if (index > 0) {
            setCurrentPage(pages[index - 1]);
        }
    }

    const [isDemographicSubmitted, setIsDemographicSubmitted] = useState(false);

    const handleDemographicsSubmit = async (age, gender, sexuality, transgender) => {
        if (useFakeDataForTestingPurposes) {
            return
        }
        const payload = {
            session_id: sessionId,
            age,
            gender,
            sexuality,
            transgender
        }
        setCurrentPage("MainPage");
        try {
            const response = await axios.post("http://localhost:8000/demographics/", payload);
            setIsDemographicSubmitted(true)
            console.log("Response from FastAPI:", response.data);
        }
        catch (err) {
            console.error("Error posting demographic:", err);
            alert("Failed to submit demographic. Returning to demographics form.");
            setCurrentPage("Demographics");
        }
    };

    const handleEmotionSubmit = async (emotion, valence, arousal) => {
        if (useFakeDataForTestingPurposes) {
            return
        }
        if (!isDemographicSubmitted) {
            alert("Need to submit demographic information before submitting any emotions");
            return
        }
        const payload = {
            session_id: sessionId,
            emotion,
            valence,
            arousal
        }
        try {
            const response = await axios.post("http://localhost:8000/emotions/", payload);
            console.log("Response from FastAPI:", response.data);
        }
        catch (err) {
            console.error("Error posting emotion:", err);
            alert("Failed to submit emotion.");
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    const pageTransition = {
        type: "tween",
        duration: 0.5,
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div style={{ flex: 1, position: "relative", width: "100%", overflow: "hidden" }}>
                <div style={{ maxWidth: "600px", margin: "20px", padding: "20px" }}>
                    <AnimatePresence mode="wait">
                        {currentPage === "Welcome" && (
                            <motion.div
                                key="welcome"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <WelcomePage />
                            </motion.div>
                        )}

                        {currentPage === "Explanation" && (
                            <motion.div
                                key="explanation"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <Explanation />
                            </motion.div>
                        )}

                        {currentPage === "Demographics" && (
                            <motion.div
                                key="demographics"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <DemographicsForm onSubmit={handleDemographicsSubmit} />
                            </motion.div>
                        )}

                        {currentPage === "MainPage" && (
                            <motion.div
                                key="body"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <MainPage emotion={shuffledEmotions[currentEmotion]} emotionUserList={emotionUserResponseList} onSubmit={handleEmotionSubmit} nextEmotion={nextEmotion} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", width: "200px", marginLeft: "auto", marginRight: "auto" }}>
                <button
                    onClick={goBack}
                    style={{ visibility: pages.indexOf(currentPage) > 0 ? "visible" : "hidden" }}
                >
                    Back
                </button>

                <button
                    onClick={goNext}
                    style={{ visibility: pages.indexOf(currentPage) < 3 ? "visible" : "hidden" }}
                >
                    Next
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default App