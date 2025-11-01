import { AnimatePresence, motion } from "motion/react"
import { genderToColor } from "../helpers/GenderToColor";

const LegendEntry = ({ gender }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="40" height="40">
                <circle
                    cx="20"
                    cy="20"
                    r="10"
                    fill={genderToColor[gender]}
                    stroke="black"
                    strokeWidth={1.5}
                />
            </svg>
            <p style={{
                fontSize: 12,
                marginLeft: 0,
                lineHeight: "1",
                background: "transparent",
                textAlign: "left",
                flex: 1
            }}>
                {gender}
            </p>
        </div>
    );
};

export default function Legend({ legendGenders, showingOtherUsers }) {
    return (
        <div style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: 'center'
        }}>

            <AnimatePresence initial={false}>
                {showingOtherUsers && (
                    <motion.div
                        key="legendGroup"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}
                    >
                        <p style={{ margin: 0 }}>Legend</p>

                        <div
                            style={{
                                width: 150,
                                border: "2px solid white",
                                borderRadius: "10px",
                                padding: "10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "4px",
                            }}
                        >
                            {legendGenders.map((g, i) => (
                                <LegendEntry key={i} gender={g} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div >
    )
}