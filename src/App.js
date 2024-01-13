import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/homePage";
import TemplatePage from "./pages/templatePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import getContent from "./shared/contentfulService";
import Navbar from "./shared/navbar/navbar";
import Footer from "./shared/footer";
import { LinearProgress } from "@mui/material";
import PhotosPage from "./pages/photosPage";
import FaqContainer from "./shared/faq/faqContainer";

function App() {
  const [pageContent, setPageContent] = useState([]);
  const [globalContent, setGlobalContent] = useState([]);
  const [faqContent, setFaqContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent("pages");
        const slugsAndHeaders = content.map((item) => ({
          slug: item.fields.slug,
          header: item.fields.header,
          description: item.fields.pageDescription,
          subTitle: item.fields.subTitle,
        }));
        setPageContent(slugsAndHeaders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent("faq");
        const questions = content.map((item) => ({
          question: item.fields.question,
          answer: item.fields.answer,
        }));
        setFaqContent(questions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ content:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent("globalData");
        const global = content.map((item) => ({
          mainWeddingTime: item.fields.mainWeddingTime,
          navTitle: item.fields.navigationTitle,
          weddingDateInNumbers: item.fields.weddingDateInNumbers,
          weddingLocation: item.fields.weddingLocation,
          homepageButtonText: item.fields.homepageButtonText,
          homePageButtonUrl: item.fields.homePageButtonUrl,
          footer: item.fields.footer,
          mainTitle: item.fields.mainTitle,
          homepageSectionTitle: item.fields.homePageSectionTitle,
          homepageMapUrl: item.fields.homepageMapUrl,
          secondaryImageUrl: item.fields.secondaryImageUrl,
          bodyBGColor: item.fields.pageBackgroundColor,
          headerFontColor: item.fields.headerFontColor,
          textFontColor: item.fields.textFontColor,
          faqTitle: item.fields.faqTitle,
          faqDescription: item.fields.faqDescription,
        }));
        setGlobalContent(global);
        console.log(global[0]?.navTitle);
        document.documentElement.style.setProperty(
          "--header-color",
          global[0].headerFontColor
        );
        document.documentElement.style.setProperty(
          "--text-color",
          global[0].textFontColor
        );
        document.documentElement.style.setProperty(
          "--body-bg-color",
          global[0].bodyBGColor
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching global content:", error);
      }
    };

    fetchData();
  }, []);

  if (pageContent.length === 0 || globalContent.length === 0) {
    return null;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar navItems={pageContent} navTitle={globalContent[0].navTitle} />
      {isLoading ? (
        <LinearProgress style={{ backgroundColor: "#f9f9f9" }} />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              pageHeaders={pageContent}
              globalContent={globalContent[0]}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            <PhotosPage
              pageHeaders={pageContent}
              globalContent={globalContent[0]}
            />
          }
        />
        <Route
          path="/:contentfulPage"
          element={
            <TemplatePage
              pageHeaders={pageContent}
              updateIsLoading={(val) => setIsLoading(val)}
            />
          }
        />
      </Routes>
      {!isLoading && (
        <FaqContainer
          title={globalContent[0].faqTitle}
          description={globalContent[0].faqDescription}
          data={faqContent}
        />
      )}
      {!isLoading && <Footer text={globalContent[0].footer} />}
    </Router>
  );
}

export default App;
