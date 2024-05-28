import React, { useEffect, useState } from "react";
import "./faq.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import getContent from "../contentfulService";

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

export default function FaqContainer() {
  const [faqContent, setFaqContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent("faq");
        const questions = content.map((item) => ({
          question: item.fields.question,
          answer: item.fields.answer,
        }));
        setFaqContent(questions);
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="questions-row">
      <div className="questions-container">
        {faqContent.map((item, index) => {
          return <FaqTest question={item.question} answer={item.answer} />;
        })}
      </div>
    </div>
  );
}
