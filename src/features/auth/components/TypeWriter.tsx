import React, { useState, useEffect } from "react";

interface Props {
  strings: string[];
}

const Typewriter: React.FC<Props> = ({ strings }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [backwards, setBackwards] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setText((text) => {
        if (text.length === strings[index]?.length) {
          setIndex((index + 1) % strings.length);
          setBackwards(true);
          return text;
        }
        if (backwards) {
          if (text.length === 0) {
            setIndex((index + 1) % strings.length);
            setBackwards(false);
          }
          return text.slice(0, -1);
        }
        return text + (strings.at(index)?.at(text.length) || "");
      });
    }, 100);
    return () => clearInterval(interval);
  }, [index, strings]);

  return (
    <div className="mi-auto relative  text-2xl font-medium tracking-wide text-[#fff]">
      {" "}
      {text}
    </div>
  );
};

export default Typewriter;
