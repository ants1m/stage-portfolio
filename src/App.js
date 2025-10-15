import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

function App() {
  const [activeGallery, setActiveGallery] = useState("home");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // --- Galleries ---
  const galleries = {
    home: [{ src: "/whereareyoumylovesfendonh-32.png", title: "Antigone 2" }],
    o_vasilikos: [
      { src: "/o_vasiikos_theatro_simeio-102.jpg", title: "Vasilikos" },
      { src: "/o_vasiikos_theatro_simeio-43.jpg", title: "Vasilikos 2" },
      { src: "/o_vasiikos_theatro_simeio-3.jpg", title: "Vasilikos 3" },
      { src: "/o_vasiikos_theatro_simeio-89.jpg", title: "Vasilikos 4" },
      { src: "/o_vasiikos_theatro_simeio-18.jpg", title: "Vasilikos 5" },
      { src: "/o_vasiikos_theatro_simeio-41.jpg", title: "Vasilikos 6" },
      { src: "/o_vasiikos_theatro_simeio-54.jpg", title: "Vasilikos 7" },
    ],
    giagia: [
      { src: "/athensconservatoire_ptuxiakes_-57.png", title: "Giagia 1" },
      { src: "/athensconservatoire_ptuxiakes_-60.png", title: "Giagia 2" },
      { src: "/athensconservatoire_ptuxiakes_-61.png", title: "Giagia 3" },
      { src: "/athensconservatoire_ptuxiakes_-62.png", title: "Giagia 4" },
    ],
    amphitheatriko: [
      { src: "/photo3.jpg", title: "Amphitheatriko 1" },
      { src: "/photo4.jpg", title: "Amphitheatriko 2" },
    ],
    whereareyoumylove: [
      { src: "/whereareyoumylovesfendonh-2.png", title: "Where Are You My Love 1" },
      { src: "/whereareyoumylovesfendonh-9 (2) copy.png", title: "Where Are You My Love 2" },
      { src: "/whereareyoumylovesfendonh-11.png", title: "Where Are You My Love 3" },
      { src: "/whereareyoumylovesfendonh-24.png", title: "Where Are You My Love 4" },
      { src: "/whereareyoumylovesfendonh-25.png", title: "Where Are You My Love 5" },
      { src: "/whereareyoumylovesfendonh-28.png", title: "Where Are You My Love 6" },
      { src: "/whereareyoumylovesfendonh-32.png", title: "Where Are You My Love 7" },
    ],
  };

  const currentImages = galleries[activeGallery] || [];

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "o_vasilikos", label: "Ο Βασιλικός" },
    { key: "giagia", label: "ΓΙΑΓΙΑ, ΟΛΑ ΜΙΑ ΜΕΡΑ ΘΑ ΠΕΘΑΝΟΥΝ" },
    { key: "amphitheatriko", label: "ΑΜΦΙΘΕΑΤΡΙΚΟ" },
    { key: "whereareyoumylove", label: "WHERE ARE YOU MY LOVE" },
  ];

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* --- MENU overlay --- */}
      <div
        style={{
          position: "fixed",
          top: activeGallery === "home" ? "50%" : "2rem",
          right: activeGallery === "home" ? "20rem" : "50%",
          transform:
            activeGallery === "home"
              ? "translateY(-50%)"
              : "translateX(50%)", // Center horizontally at top
          display: "flex",
          flexDirection: activeGallery === "home" ? "column" : "row",
          gap: activeGallery === "home" ? "1.2rem" : "2.5rem",
          textAlign: activeGallery === "home" ? "right" : "center",
          zIndex: 2000,
          background: activeGallery === "home" ? "none" : "rgba(0,0,0,0.6)",
          padding: activeGallery === "home" ? "0" : "1rem 1.5rem",
          borderRadius: activeGallery === "home" ? "0" : "10px",
          transition: "all 0.6s ease",
        }}
      >
        {menuItems.map((item) => (
          <span
            key={item.key}
            onClick={() => {
              setActiveGallery(item.key);
              setOpen(false);
            }}
            style={{
              cursor: "pointer",
              fontSize: activeGallery === item.key ? "1.6rem" : "1rem",
              color: activeGallery === item.key ? "red" : "#aaa",
              fontWeight: activeGallery === item.key ? "bold" : "normal",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </span>
        ))}

        {/* --- Contact line --- */}
        <a
          href="mailto:an.tsimourhs@outlook.com?subject=Booking%20Enquiry"
          style={{
            marginTop: activeGallery === "home" ? "2rem" : "0",
            fontFamily: "'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "#ccc",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
        >
          Contact to book your shoot
        </a>
      </div>

      {/* --- CONTENT --- */}
      <div style={{ padding: "2rem" }}>
        {activeGallery === "home" ? (
          // Background image for home
          <div
            style={{
              height: "100vh",
              backgroundImage: `url(${currentImages[0].src})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
            }}
          />
        ) : (
          // --- Gallery grid ---
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
              marginTop: "8rem",
              justifyItems: "center",
              alignItems: "center",
              padding: "0 4rem",
            }}
          >
            {currentImages.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                style={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    borderRadius: "6px",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX --- */}
      {activeGallery !== "home" && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          plugins={[Captions]}
          slides={currentImages.map((img) => ({
            src: img.src,
            description: img.title,
          }))}
        />
      )}
    </div>
  );
}

export default App;
