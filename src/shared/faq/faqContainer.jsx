import React, { useState } from "react";
import "./faq.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const FaqTest = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      key={question}
      className="faq-item"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <p className="fancy-font">{question.toUpperCase()}</p>
      {showAnswer && (
        <p className="fancy-font"> {documentToReactComponents(answer)}</p>
      )}
    </div>
  );
};

export default function FaqContainer({ title, description, data }) {
  return (
    <div className="questions-row">
      <div className="questions-container">
        <div className="header-section fancy-font">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {data.map((item, index) => {
          return <FaqTest question={item.question} answer={item.answer} />;
        })}
      </div>
    </div>
  );
}
