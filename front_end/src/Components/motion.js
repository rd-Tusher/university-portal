import React, { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

export default function Motion() {
  const [show, setShow] = useState(null);
  const [displayCount, setDisplayCount] = useState(0); // 👈 display number for React

  // motion values
  const count = useMotionValue(95);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // animate count
  useEffect(() => {
    const controls = animate(count, 10, { duration: 2 });
    return () => controls.stop();
  }, [count]);

  // subscribe to motion value updates (and sync with React)
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayCount(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <div style={{ padding: "2rem" }} className="container">
      {show === null ? (
        <motion.div
          key="first"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 100, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          className="sch-card"
        >
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            hi this is first text
          </motion.p>
          <p>this is another text</p>
        </motion.div>
      ) : (
        <motion.div
          key="second"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 100, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          className="sch-card"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            this is third text
          </motion.p>
          <p>this is another text</p>
        </motion.div>
      )}

      {/* ✅ render normal number, not motion object */}
      <pre
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#00bfff",
          marginTop: "1rem",
        }}
      >
       "timer counter" {displayCount}
      </pre>

      <motion.button
        animate={{ x: 200, y: 10, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="btn btn-outline-info"
        onClick={() => setShow(show === null ? true : '')}
      >
        Toggle Motion
      </motion.button>
    </div>
  );
}
