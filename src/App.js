import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Masonry from "react-masonry-css";

function App() {
  const [activeGallery, setActiveGallery] = useState("home");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  // --- All galleries with OPTIONAL hotspots ---
  const galleries = {
    home: [
      {
        src: "/whereareyoumylovesfendonh-32.png",
        title: "Antigone 2",
      },
    ],
    o_vasilikos: [
      {
        src: "/o_vasiikos_theatro_simeio-102.jpg",
        title: "Vasilikos",
        // Example hotspots – adjust x/y as you like
        hotspots: [
          {
            x: "42%", // Χριστίνα, left
            y: "30%",
            label: "Χριστίνα Χειλά-Φαμέλη",
          },
          {
            x: "57%", // Κωνσταντίνος, right
            y: "50%",
            label: "Κωνσταντίνος Γώγουλος",
          },
        ],
      },
      {
        src: "/o_vasiikos_theatro_simeio-43.jpg",
        title: "Vasilikos 2",
      },
      {
        src: "/o_vasiikos_theatro_simeio-3.avif",
        title: "Vasilikos 3",
        // 4 hotspots for the seated + standing actors
        hotspots: [
          {
            x: "26%",
            y: "72%",
            label: "Δανάη Αναστασία Γεωργούλα",
          },
          {
            x: "49%",
            y: "60%",
            label: "Χριστίνα Χειλά-Φαμέλη",
          },
          {
            x: "63%",
            y: "92%",
            label: "Κωνσταντίνος Γώγουλος",
          },
          {
            x: "82%",
            y: "63%",
            label: "Παναγιώτης Παπαϊωάννου",
          },
        ],
      },
      {
        src: "/o_vasiikos_theatro_simeio-89.jpg",
        title: "Vasilikos 4",
      },
      {
        src: "/o_vasiikos_theatro_simeio-18.jpg",
        title: "Vasilikos 5",
      },
      {
        src: "/o_vasiikos_theatro_simeio-41.jpg",
        title: "Vasilikos 6",
      },
      {
        src: "/o_vasiikos_theatro_simeio-54.jpg",
        title: "Vasilikos 7",
      },
    ],
    giagia: [
      {
        src: "/athensconservatoire_ptuxiakes_-57.png",
        title: "Giagia 1",
      },
      {
        src: "/athensconservatoire_ptuxiakes_-60.png",
        title: "Giagia 2",
      },
      {
        src: "/athensconservatoire_ptuxiakes_-61.png",
        title: "Giagia 3",
      },
      {
        src: "/athensconservatoire_ptuxiakes_-62.png",
        title: "Giagia 4",
      },
    ],
    amphitheatriko: [
      {
        src: "/photo3.jpg",
        title: "Amphitheatriko 1",
      },
      {
        src: "/photo4.jpg",
        title: "Amphitheatriko 2",
      },
    ],
    whereareyoumylove: [
      {
        src: "/whereareyoumylovesfendonh-2 copy.avif",
        title: "Where Are You My Love 1",
      },
      {
        src: "/whereareyoumylovesfendonh-9 (2) copy.avif",
        title: "Where Are You My Love 2",
      },
      {
        src: "/whereareyoumylovesfendonh-11 copy.avif",
        title: "Where Are You My Love 3",
      },
      {
        src: "/whereareyoumylovesfendonh-24 copy.avif",
        title: "Where Are You My Love 4",
      },
      {
        src: "/whereareyoumylovesfendonh-25 copy.avif",
        title: "Where Are You My Love 5",
      },
      {
        src: "/whereareyoumylovesfendonh-28 copy.avif",
        title: "Where Are You My Love 6",
      },
      {
        src: "/whereareyoumylovesfendonh-32 copy.avif",
        title: "Where Are You My Love 7",
      },
    ],
    cabaret: [],
    endgame: [],
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const currentImages = galleries[activeGallery] || [];

  // --- Info text for each show ---
  const infoTexts = {
    o_vasilikos: `
Σκηνοθεσία: Κωνσταντίνος Χειλάς
Σκηνογραφία – Φωτισμοί: Ζωή Μολυβδά Φαμέλη
Επιμέλεια Κίνησης: Αγγελική Τρομπούκη
Ενδυματολογία: Ανδρομάχη Ζαχαριά
Φωτογραφίες: Αλέξανδρος Σταματάρης
Βοηθός Σκηνοθέτη: Βασιλική Κουλουμπή

Παίζουν [αλφαβητικά]: Μαρία Αποστολακέα, Δανάη Αναστασία Γεωργούλα, Κωνσταντίνος Γώγουλος, Παναγιώτης Παπαϊωάννου, Θανάσης Ρέστας, Χριστίνα Χειλά Φαμέλη

Θέατρο Σημείο, Χαρ. Τρικούπη 4, Καλλιθέα
Από 27 Ιανουαρίου 2025 εώς τέλη Μαρτίου 2025
    `,
    whereareyoumylove: `
Σκηνοθεσία: Χάρης Φραγκούλης
Βοηθός σκηνοθέτη: Άννα Βλάχου
Φώτα: Βαγγέλης Σαγρής
Κοστούμια: Δήμητρα Ρίζου
Αφίσα: Γιάννης Χαριτίδης
Οργάνωση παραγωγής: TooFarEast
Εκτέλεση παραγωγής: Σέτα Αστραίου Καρύδη

Παίζουν: Νικόλας Αγαπίου, Σαβίνα Αλεβιζάκη, Άννα Βλάχου, Μαρία Θανασάκη, Ιωσήφ Καμπουράκης, Ευανθία Κιάκο, Αλέξανδρος Κώτης, Αναστασία Λεωνίδου, Βικτωρία Λυδατάκη, Μαριάννα Ζωή Μαριγώνη, Κωνσταντίνα Μέσσιου, Όλγα Μιχαλοπούλου, Μικαέλα Μπραούνου, Αντιγόνη Παπαποστόλου, Τάσος Πετρίτσης, Ράνια Πολυχρονάκη, Παναγιώτης Ρενιέρης, Δήμητρα Ρίζου, Ναϊάδα Σαγρή, Αγγελική Σιτρά, Κατερίνα Τοκμακτσή
    `,
  };

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "o_vasilikos", label: "Ο ΒΑΣΙΛΙΚΟΣ" },
    { key: "giagia", label: "ΓΙΑΓΙΑ, ΟΛΑ ΜΙΑ ΜΕΡΑ ΘΑ ΠΕΘΑΝΟΥΝ" },
    { key: "amphitheatriko", label: "ΑΜΦΙΘΕΑΤΡΙΚΟ" },
    { key: "whereareyoumylove", label: "WHERE ARE YOU MY LOVE" },
    { key: "cabaret", label: "CABARET" },
    { key: "endgame", label: "ENDGAME" },
  ];

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#050505",
        color: "#e0e0e0",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* --- MENU overlay --- */}
      <div
        className={`menu-container ${activeGallery !== "home" && !mobileMenuExpanded ? "mobile-collapsed" : ""
          }`}
        style={{
          position: "absolute",
          top: activeGallery === "home" ? "40%" : "1rem",
          right: activeGallery === "home" ? "20rem" : "auto",
          left: activeGallery === "home" ? "auto" : "50%",
          transform:
            activeGallery === "home"
              ? "translateY(-50%)"
              : "translateX(-50%)",
          display: "flex",
          flexDirection: activeGallery === "home" ? "column" : "row",
          gap: activeGallery === "home" ? "1.2rem" : "2rem",
          textAlign: activeGallery === "home" ? "right" : "center",
          justifyContent: activeGallery === "home" ? "flex-end" : "center",
          zIndex: 2000,
          width: activeGallery === "home" ? "auto" : "100%",
        }}
      >
        {activeGallery === "home" && (
          <img
            src="/worldsonstage.png"
            alt="Worlds On Stage Logo"
            className="logo-img"
            onClick={() => {
              setActiveGallery("home");
              setOpen(false);
              setShowInfo(false);
              setMobileMenuExpanded(false);
            }}
          />
        )}



        {menuItems.map((item) => (
          <motion.span
            key={item.key}
            whileHover={{
              scale: 1.1,
              color: "#fff",
              x: 10, // Subtle shift to the right
              textShadow: "0px 0px 8px rgba(255,255,255,0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveGallery(item.key);
              setOpen(false);
              setShowInfo(false);
              setMobileMenuExpanded(false); // Close menu after selection
            }}
            style={{
              cursor: "pointer",
              fontSize: activeGallery === item.key ? "1.6rem" : "1rem",
              color: activeGallery === item.key ? "#fff" : "#888",
              fontWeight: activeGallery === item.key ? "bold" : "normal",
              display: "inline-block", // Required for transform
              // Transition handled by motion
            }}
          >
            {item.label}
          </motion.span>
        ))}


        {/* --- Contact line --- */}
        <a
          href="mailto:an.tsimourhs@outlook.com?subject=Booking%20Enquiry"
          style={{
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

        {/* --- More Info button --- */}
        {infoTexts[activeGallery] && (
          <span
            className="more-info-button"
            onClick={() => setShowInfo(true)}
          >
            More Info
          </span>
        )}
      </div>

      {/* --- CONTENT --- */}
      <div className="app-container">
        <AnimatePresence mode="wait">
          {activeGallery === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="home-hero-image"
              style={{
                backgroundImage: `url(${currentImages[0].src})`,
              }}
            />
          ) : (
            <motion.div
              key={activeGallery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {currentImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      marginBottom: "1rem", // Space between items vertically
                      overflow: "hidden",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                      cursor: "pointer",
                      background: "transparent",
                    }}
                    onClick={() => {
                      setIndex(idx);
                      setOpen(true);
                      setShowHotspots(false);
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      style={{
                        width: "100%", // critical for masonry
                        display: "block",
                        borderRadius: "6px",
                      }}
                    />
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- LIGHTBOX with custom slide for hotspots --- */}
      {activeGallery !== "home" && (
        <Lightbox
          open={open}
          close={() => {
            setOpen(false);
            setShowHotspots(false);
          }}
          index={index}
          plugins={[Captions]}
          // keep title as caption text
          slides={currentImages.map((img) => ({
            ...img,
            description: img.title,
          }))}
          render={{
            slide: ({ slide }) => (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseEnter={() => setShowHotspots(true)}
                onMouseLeave={() => setShowHotspots(false)}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                {slide.hotspots &&
                  slide.hotspots.map((spot, i) => (
                    <div
                      key={i}
                      className="hotspot-label"
                      style={{
                        left: spot.x,
                        top: spot.y,
                        opacity: showHotspots ? 1 : 0,
                      }}
                    >
                      {spot.label}
                    </div>
                  ))}
              </div>
            ),
          }}
        />
      )}

      {/* --- INFO OVERLAY --- */}
      {showInfo && (
        <div
          onClick={() => setShowInfo(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(5, 5, 5, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3000,
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            style={{
              maxWidth: "600px",
              padding: "2rem",
              color: "#fff",
              textAlign: "center",
              whiteSpace: "pre-line",
              lineHeight: "1.6",
              fontSize: "1.1rem",
            }}
          >
            {infoTexts[activeGallery]}
          </div>
        </div>
      )}

      {/* --- Toggle Button (Mobile Only) - PORTAL for Z-INDEX --- */}
      {activeGallery !== "home" && ReactDOM.createPortal(
        <div
          onClick={() => setMobileMenuExpanded(!mobileMenuExpanded)}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "1.5rem",
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            background: "rgba(5, 5, 5, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            zIndex: 999999, // MAX
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
          }}
        >
          {mobileMenuExpanded ? "▼" : "▲"}
        </div>,
        document.body
      )}

    </div>
  );
}

export default App;
