import React, { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Explanation from "./components/body/Explanation"
import DemographicsForm from "./components/body/DemographicsForm";
import WelcomePage from "./components/body/WelcomePage";
import { motion, AnimatePresence } from "framer-motion";
import MainPage from "./components/body/MainPage";


function App() {
    const [currentPage, setCurrentPage] = useState(0); // 0 = welcome, 1 = explanation, 2 = main body

    const goNext = () => setCurrentPage((prev) => prev + 1);
    const goBack = () => setCurrentPage((prev) => prev - 1);

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
                    <AnimatePresence exitBeforeEnter>
                        {currentPage === 0 && (
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

                        {currentPage === 1 && (
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

                        {currentPage === 2 && (
                            <motion.div
                                key="demographics"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <DemographicsForm />
                            </motion.div>
                        )}

                        {currentPage === 3 && (
                            <motion.div
                                key="body"
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={pageTransition}
                                style={{ position: "absolute", width: "100%" }}
                            >
                                <MainPage />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", width: "200px", marginLeft: "auto", marginRight: "auto" }}>
                <button
                    onClick={goBack}
                    style={{ visibility: currentPage > 0 ? "visible" : "hidden" }}
                >
                    Back
                </button>

                <button
                    onClick={goNext}
                    style={{ visibility: currentPage < 3 ? "visible" : "hidden" }}
                >
                    Next
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default App