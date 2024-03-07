import React, { useState } from "react";

const ENTER = 13;
const COMMA = 188;
const BACKSPACE = 8;

export default function TagInput({ tags, setTags }: { tags: string[], setTags: (tags: string[]) => void }) {
  const [value, setValue] = useState("");

  const handleKeyUp = (e) => {
    const key = e.keyCode;
    if (key === ENTER || key === COMMA) {
      addTag();
    }
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode;
    if (key === BACKSPACE && !value) {
      editTag();
    }
  };

  const addTag = () => {
    let tag = value.trim().replace(/,/g, "");
    if (!tag) return;
    setTags([...tags, tag]);
    setValue("");
  };

  const editTag = () => setValue(tags.pop());

  return (
    <>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-[#1E2A78] text-white rounded-3xl px-4 py-1 m-1 inline-block"
        >
          {tag}
        </span>
      ))}
      <input
        type="text"
        placeholder="Add tag..."
        className="inline-block w-[100px] p-1"
        //   autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
    </>


  );
}
