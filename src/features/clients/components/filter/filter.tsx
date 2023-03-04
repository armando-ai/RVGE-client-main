import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isOpen: boolean;
};

export const Filter = ({ isOpen }: Props) => {
  console.log(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 64 }}
          animate={{ opacity: 1, x: 0, y: 64 }}
          exit={{ opacity: 0, x: -100, y: 64 }}
          transition={{ duration: 0.7 }}
          className="fixed mx-4 flex w-full rounded bg-red-500 py-8"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};
