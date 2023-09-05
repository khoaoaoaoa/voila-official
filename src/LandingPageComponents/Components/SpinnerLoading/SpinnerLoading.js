import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { motion } from "framer-motion";
const SpinnerLoading = ({ children }) => {
  const [loading, setLoading] = useState(true);
  console.log(loading);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    console.log(loading);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {loading ? (
        <PropagateLoader
          color="#36d7b7"
          cssOverride={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {children}
        </motion.div>
      )}
    </>
  );
};

export default SpinnerLoading;
