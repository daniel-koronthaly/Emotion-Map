import { motion, AnimatePresence } from "framer-motion";

export function AnimatedText({ flag, delay, children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={`${flag}-${children}`} 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: delay }}
        style={{
          marginTop: -40,
          minHeight: 40,
          textAlign: "center",
          whiteSpace: "normal", // ensures wrapping
          display: "inline-block", // allows animation without column behavior
        }}
      >
        {children}
      </motion.p>
    </AnimatePresence>
  );
}