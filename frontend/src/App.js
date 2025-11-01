import React, { useState, useRef, useEffect } from "react";
import Header from "./components/header/Header";
import Explanation from "./components/body/Explanation"
import DemographicsForm from "./components/body/DemographicsForm";
import WelcomePage from "./components/body/WelcomePage";
import { motion, AnimatePresence } from "framer-motion";
import MainPage from "./components/body/MainPage";
import { emotions, shuffle } from "./components/helpers/EmotionList";
import { fakeData } from "./components/helpers/MockEmotionData";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import styles from "./styles/Theme.module.css"
import ExportToCsv from "./components/body/ExportToCsv";
import About from "./components/body/About";

const useFakeDataForTestingPurposes = false

function App() {
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

    const [isDemographicSubmitted, setIsDemographicSubmitted] = useState(false);

    const handleDemographicsSubmit = async (age, gender, sexuality, transgender) => {
        if (useFakeDataForTestingPurposes) {
            return
        }
        if (isDemographicSubmitted) {
            alert("You have already submitted the demographic form.");
            setCurrentPage("MainPage");
            return;
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
            setCurrentPage("Demographics");
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
        <div className={styles.backgroundColor} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} isDemographicSubmitted={isDemographicSubmitted} />
            <div style={{ flex: 1, position: "relative", width: "100%", overflow: "hidden" }}>
                <div style={{ maxWidth: "600px", marginLeft: "20px", padding: "10px" }}>
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
                                <WelcomePage setCurrentPage={setCurrentPage} />
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
                                <Explanation setCurrentPage={setCurrentPage} 
                                isDemographicSubmitted={isDemographicSubmitted} />
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
                                <MainPage
                                    emotion={shuffledEmotions[currentEmotion]}
                                    emotionUserList={emotionUserResponseList}
                                    onSubmit={handleEmotionSubmit}
                                    nextEmotion={nextEmotion} />
                            </motion.div>
                        )}

                        {currentPage === "ExportToCsv" && (
                            <motion.div
                                key="export"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <ExportToCsv />
                            </motion.div>
                        )}

                        {currentPage === "About" && (
                            <motion.div
                                key="about"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <About />
                            </motion.div>
                        )}

                        {currentPage === "Results" && (
                            <motion.div
                                key="results"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <h1>Thank you for participating!</h1>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default App