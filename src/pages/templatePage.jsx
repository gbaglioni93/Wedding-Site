import React, { useEffect, useState } from "react";
import "./css/templatePage.css";
import { useLocation } from "react-router-dom";
import getContent from "../shared/contentfulService";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import FaqContainer from "../shared/faq/faqContainer";

export default function TemplatePage(props) {
  const [content, setContent] = useState(null);
  const [chosenPage, setChosenPage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    props.updateIsLoading(true);
    const fetchData = async () => {
      try {
        const fetchedContent = await getContent("pageContent");
        const sanitizedContent = fetchedContent.map((item) => ({
          title: item.fields.title,
          leftInfo: item.fields.leftInfo,
          buttonText: item.fields.buttonText,
          page: item.fields.pageTopic,
          rightContent: item.fields.rightContent,
          buttonUrl: item.fields.buttonUrl,
        }));
        setContent(sanitizedContent);
        console.log(sanitizedContent);
        props.updateIsLoading(false);
      } catch (error) {
        console.error("Error fetching content:", error);
        props.updateIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const directionsIndex = props.pageHeaders.findIndex(
      (item) => "/" + item.slug === location.pathname
    );
    if (directionsIndex !== -1) {
      setChosenPage(props.pageHeaders[directionsIndex]);
    } else {
      window.location.href = "/";
    }
  }, [location.pathname, props.pageHeaders]);

  // Filter content based on the current location
  const filteredContent = content
    ? content.filter(
        (item) => item.page.toLowerCase() === location.pathname.substring(1)
      )
    : [];

  // Check if props or chosenPage is not available
  if (!props || !chosenPage || !content) {
    return null;
  }

  return (
    <>
      <div className="header-section fancy-font">
        <h1>{chosenPage.header}</h1>
        {chosenPage.subTitle && <p>{chosenPage.subTitle}</p>}
        {documentToReactComponents(chosenPage.description)}
      </div>

      {chosenPage.slug === "faq" ? <FaqContainer data={props.faq} /> : null}

      {filteredContent.map((item) => (
        <div className="content-row fancy-font" key={item.title}>
          <div>
            <h1>{item.title.toUpperCase()}</h1>
            {item.leftInfo &&
              item.leftInfo.map((info) => <p key={info}>{info}</p>)}
          </div>
          <div>
            {item.rightContent && documentToReactComponents(item.rightContent)}

            {item.buttonText && (
              <button
                onClick={() => (window.location.href = item.buttonUrl)}
                className="btn-link fancy-font "
              >
                {item.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
