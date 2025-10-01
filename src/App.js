import React, { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

function App() {
  // Track which gallery is active
  const [activeGallery, setActiveGallery] = useState("home");

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Define galleries
  const galleries = {
    home: [
      { src: "/whereareyoumylovesfendonh-32.png", title: "Antigone 2" },
    ],
    o_vasilikos: [
      { src: "/o_vasiikos_theatro_simeio-102.jpg", title: "Antigone" },
      { src: "/o_vasiikos_theatro_simeio-43.jpg", title: "Hamlet" },
    ],
    giagia: [
      { src: "/photo1.jpg", title: "Play 1" },
      { src: "/photo2.jpg", title: "Play 2" },
    ],
    amphitheatriko: [
      { src: "/photo3.jpg", title: "Amphitheatriko 1" },
      { src: "/photo4.jpg", title: "Amphitheatriko 2" },
    ],
    whereareyoumylove: [
      { src: "/photo5.jpg", title: "Where Is My Love 1" },
      { src: "/photo6.jpg", title: "Where Is My Love 2" },
    ],
  };

  // Current gallery
  const currentImages = galleries[activeGallery] || [];

  return (
    <div className="App" style={{ backgroundColor: "#000", color: "#fff" }}>
      {/* HEADER MENU */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <span
          style={{ cursor: "pointer", color: activeGallery === "home" ? "red" : "white" }}
          onClick={() => setActiveGallery("home")}
        >
          Home
        </span>
        <span
          style={{ cursor: "pointer", color: activeGallery === "o_vasilikos" ? "red" : "white" }}
          onClick={() => setActiveGallery("o_vasilikos")}
        >
          Ο Βασιλικός
        </span>
        <span
          style={{ cursor: "pointer", color: activeGallery === "giagia" ? "red" : "white" }}
          onClick={() => setActiveGallery("giagia")}
        >
          ΓΙΑΓΙΑ, ΟΛΑ ΜΙΑ ΜΕΡΑ ΘΑ ΠΕΘΑΝΟΥΝ
        </span>
        <span
          style={{ cursor: "pointer", color: activeGallery === "amphitheatriko" ? "red" : "white" }}
          onClick={() => setActiveGallery("amphitheatriko")}
        >
          ΑΜΦΙΘΕΑΤΡΙΚΟ
        </span>
        <span
          style={{
            cursor: "pointer",
            color: activeGallery === "whereareyoumylove" ? "red" : "white",
          }}
          onClick={() => setActiveGallery("whereareyoumylove")}
        >
          WHERE ARE YOU MY LOVE
        </span>
      </nav>

      {/* PAGE CONTENT */}
      <div style={{ paddingTop: "6rem", padding: "2rem" }}>
        <h1 style={{ textAlign: "center" }}>
          Stage Photography Portfolio
        </h1>

        {/* GALLERY GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {currentImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              style={{
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
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
    </div>
  );
}

export default App;
