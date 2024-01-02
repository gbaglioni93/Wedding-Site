import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/homePage";
import TemplatePage from "./pages/templatePage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import getContent from "./shared/contentfulService";
import Navbar from "./shared/navbar/navbar";
import Footer from "./shared/footer";
import { LinearProgress } from "@mui/material";

function App() {
  const [pageContent, setPageContent] = useState([]);
  const [globalContent, setGlobalContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const content = await getContent("pages");
        const slugsAndHeaders = content.map((item) => ({
          slug: item.fields.slug,
          header: item.fields.header,
          description: item.fields.description,
          subTitle: item.fields.subTitle,
        }));
        setPageContent(slugsAndHeaders);
      } catch (error) {
        console.error("Error fetching page content:", error);
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
          homepageSectionMap: item.fields.homepageSectionMap,
          secondaryImageUrl: item.fields.secondaryImageUrl,
        }));
        setGlobalContent(global);
        console.log(global[0]?.navTitle);
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
    <Router
    // basename={process.env.PUBLIC_URL}
    >
      <Navbar navItems={pageContent} navTitle={globalContent[0].navTitle} />
      {isLoading ? <LinearProgress /> : null}
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
          path="/:x"
          element={
            <TemplatePage
              pageHeaders={pageContent}
              updateIsLoading={(val) => setIsLoading(val)}
            />
          }
        />
      </Routes>
      {!isLoading && <Footer text={globalContent[0].footer} />}
    </Router>
  );
}

export default App;
