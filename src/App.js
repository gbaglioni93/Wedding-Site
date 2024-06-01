import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/homePage";
import TemplatePage from "./pages/templatePage";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import getContent from "./shared/contentfulService";
import Navbar from "./shared/navbar/navbar";
import Footer from "./shared/footer";
import { LinearProgress } from "@mui/material";
import PhotosPage from "./pages/photosPage";

function App() {
  const [pageContent, setPageContent] = useState([]);
  const [globalContent, setGlobalContent] = useState([]);
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
          fancyFont: item.fields.fancyFont,
          h2FontSize: item.fields.h2FontSize,
          h1FontSize: item.fields.h1FontSize,
          paragraphFontSize: item.fields.paragraphFontSize,
        }));
        setGlobalContent(global);
        console.log(global[0]?.navTitle);
        document.documentElement.style.setProperty(
          "--header-color",
          global[0].headerFontColor
        );
        document.documentElement.style.setProperty(
          "--h1-font-size",
          global[0].h1FontSize
        );
        document.documentElement.style.setProperty(
          "--h2-font-size",
          global[0].h2FontSize
        );
        document.documentElement.style.setProperty(
          "--paragraph-font-size",
          global[0].paragraphFontSize
        );
        document.documentElement.style.setProperty(
          "--fancy-font",
          global[0].fancyFont
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
    return <LinearProgress style={{ backgroundColor: "#f4f4f4" }} />;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar navItems={pageContent} navTitle={globalContent[0].navTitle} />
      {isLoading ? (
        <LinearProgress style={{ backgroundColor: "#f4f4f4" }} />
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
      {!isLoading && <Footer text={globalContent[0].footer} />}
    </Router>
  );
}

export default App;
