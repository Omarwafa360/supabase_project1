import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [pageBackgrounds, setPageBackgrounds] = useState(() => {
    try {
      const storedBackgrounds = localStorage.getItem("pageBackgrounds");
      return storedBackgrounds ? JSON.parse(storedBackgrounds) : {
        Home: "#ffffff",
        About: "#ffffff",
        Menu: "#ffffff",
        Gallery: "#ffffff",
        Contact: "#ffffff",
        Booking: "#ffffff",
        Admin: "#ffffff",
        AdminLogin: "#ffffff", // إضافة AdminLogin
      };
    } catch (error) {
      console.error("Failed to load page backgrounds from localStorage", error);
      return {
        Home: "#ffffff",
        About: "#ffffff",
        Menu: "#ffffff",
        Gallery: "#ffffff",
        Contact: "#ffffff",
        Booking: "#ffffff",
        Admin: "#ffffff",
        AdminLogin: "#ffffff",
      };
    }
  });

  const [pageTypography, setPageTypography] = useState(() => {
    try {
      const storedTypography = localStorage.getItem("pageTypography");
      return storedTypography ? JSON.parse(storedTypography) : {
        Home: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        About: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Menu: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Gallery: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Contact: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Booking: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Admin: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        AdminLogin: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" }, // إضافة AdminLogin
      };
    } catch (error) {
      console.error("Failed to load page typography from localStorage", error);
      return {
        Home: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        About: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Menu: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Gallery: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Contact: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Booking: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        Admin: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
        AdminLogin: { fontFamily: "Tajawal, sans-serif", fontSize: "16px", color: "#333", fontWeight: "normal", textAlign: "right" },
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pageBackgrounds", JSON.stringify(pageBackgrounds));
    } catch (error) {
      console.error("Failed to save page backgrounds to localStorage", error);
    }
  }, [pageBackgrounds]);

  useEffect(() => {
    try {
      localStorage.setItem("pageTypography", JSON.stringify(pageTypography));
    } catch (error) {
      console.error("Failed to save page typography to localStorage", error);
    }
  }, [pageTypography]);

  const setThemeForPage = (page, color) => {
    setPageBackgrounds(prev => ({ ...prev, [page]: color }));
  };

  const setTypographyForPage = (page, typographySettings) => {
    setPageTypography(prev => ({
      ...prev,
      [page]: { ...prev[page], ...typographySettings }
    }));
  };

  return (
    <ThemeContext.Provider value={{ pageBackgrounds, setThemeForPage, pageTypography, setTypographyForPage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
