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
  const [index, setIndex] = useState(0); // For lightbox
  const [currentHomeIndex, setCurrentHomeIndex] = useState(0); // For homepage slideshow
  const [showInfo, setShowInfo] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);



  // --- All galleries with OPTIONAL hotspots ---
  const galleries = React.useMemo(() => ({
    home: [
      {
        src: "/whereareyoumylovesfendonh-32.png",
        title: "Antigone 2",
        mobilePosition: "10% 20%", // Focus on face
      },
      {
        src: "/cabaret_2-2.avif",
        title: "Cabaret Highlight",
        mobilePosition: "60% 30%",
      },
      {
        src: "/o_vasiikos_theatro_simeio-102.jpg",
        title: "Vasilikos Highlight",
        mobilePosition: "50% 20%",
      },
      {
        src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-8.avif",
        title: "Cabaret Atmosphere",
        mobilePosition: "center 50%",
      },
      {
        src: "/o_vasiikos_theatro_simeio-18.jpg",
        title: "Vasilikos Scene",
        mobilePosition: "center center",
      },
      {
        src: "/whereareyoumylovesfendonh-2 copy.avif",
        title: "Where Are You My Love Duo",
        mobilePosition: "40% 40%",
      },
      {
        src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-47.avif",
        title: "Cabaret Focus",
        mobilePosition: "center 20%",
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
    amphitheatriko: [],
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
    cabaret: [
      { src: "/cabaret_2-2.avif", title: "Cabaret 1" },
      { src: "/cabaret_2.avif", title: "Cabaret 2" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-110.avif", title: "Cabaret 3" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-111.avif", title: "Cabaret 4" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-116.avif", title: "Cabaret 5" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-119.avif", title: "Cabaret 6" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-123.avif", title: "Cabaret 7" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-129.avif", title: "Cabaret 8" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-47.avif", title: "Cabaret 9" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-51.avif", title: "Cabaret 10" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-71.avif", title: "Cabaret 12" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-8.avif", title: "Cabaret 13" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-87.avif", title: "Cabaret 14" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-89.avif", title: "Cabaret 15" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-90.avif", title: "Cabaret 16" },
      { src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school.avif", title: "Cabaret 17" },
    ],
    endgame: [],
  }), []);

  // --- Slideshow Timer (10s) ---
  React.useEffect(() => {
    let interval;
    if (activeGallery === "home") {
      interval = setInterval(() => {
        setCurrentHomeIndex((prev) => (prev + 1) % galleries.home.length);
      }, 5000); // 5 seconds
    }
    return () => clearInterval(interval);
  }, [activeGallery, galleries]);

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
    giagia: "More info coming soon...",
    amphitheatriko: "More info coming soon...",
    cabaret: "More info coming soon...",
    endgame: "More info coming soon...",
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

  // --- Split Navigation for Desktop ---
  const desktopLeftItems = menuItems.slice(1, 4); // Vasilikos, Giagia, Amphitheatriko
  const desktopRightItems = menuItems.slice(4, 7); // Wayml, Cabaret, Endgame

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
      {/* --- DESKTOP NAVIGATION (Split) --- */}
      {/* Visible only on Desktop (media query could be better, but using JS check for now or CSS class) */}
      <div className="desktop-nav" style={{
        position: "absolute",
        top: "2rem",
        left: 0,
        right: 0,
        zIndex: 2000,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 2rem",
        pointerEvents: "auto",
        transition: "opacity 0.3s ease",
      }}>
        {/* Left Links */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "flex-end", paddingRight: "3rem" }}>
          {desktopLeftItems.map((item) => (
            <span
              key={item.key}
              onClick={() => setActiveGallery(item.key)}
              className="desktop-link"
              style={{
                cursor: "pointer",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#ccc",
                fontWeight: "500",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "#ccc"}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Center Logo */}
        <img
          src="/worldsonstage.png"
          alt="Logo"
          style={{ height: "50px", cursor: "pointer", opacity: 0.9, display: "block" }}
          onClick={() => setActiveGallery("home")}
        />

        {/* Right Links */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "flex-start", paddingLeft: "3rem" }}>
          {desktopRightItems.map((item) => (
            <span
              key={item.key}
              onClick={() => setActiveGallery(item.key)}
              className="desktop-link"
              style={{
                cursor: "pointer",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#ccc",
                fontWeight: "500",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "#ccc"}
            >
              {item.label}
            </span>
          ))}

          {/* Contact (Desktop) */}
          <a
            href="mailto:an.tsimourhs@outlook.com?subject=Booking%20Enquiry"
            className="desktop-link"
            style={{
              cursor: "pointer",
              fontSize: "0.85rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#ccc",
              fontWeight: "500",
              textDecoration: "none",
              transition: "color 0.2s ease",
              paddingLeft: "2rem"
            }}
            onMouseEnter={(e) => e.target.style.color = "#fff"}
            onMouseLeave={(e) => e.target.style.color = "#ccc"}
          >
            CONTACT
          </a>
        </div>
      </div>


      {/* --- Mobile Header (Home Only) --- */}
      {activeGallery === "home" && (
        <div
          className="mobile-header-home"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            padding: "2rem 1.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 3000,
          }}>
          {/* MENU Text - Triggers Menu */}
          <span
            onClick={() => setMobileMenuExpanded(true)}
            style={{
              fontSize: "0.85rem",
              letterSpacing: "1.5px",
              fontWeight: "500",
              color: "#e0e0e0",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            MENU
          </span>

          {/* Logo Center */}
          <img
            src="/worldsonstage.png"
            alt="Logo"
            onClick={() => window.location.reload()}
            style={{
              height: "45px",
              cursor: "pointer",
              opacity: 0.9,
            }}
          />

          {/* Contact Right */}
          <a
            href="mailto:an.tsimourhs@outlook.com?subject=Booking%20Enquiry"
            style={{
              fontSize: "0.85rem",
              letterSpacing: "1.5px",
              fontWeight: "500",
              color: "#e0e0e0",
              cursor: "pointer",
              textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            CONTACT
          </a>
        </div>
      )}

      {/* --- MOBILE Menu overlay (Navigation List) --- */}
      {/* --- MOBILE Menu overlay (Side Drawer) --- */}
      <div
        className={`menu-container ${!mobileMenuExpanded ? "mobile-collapsed" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "75%", // Uncover more of the screen
          background: "#EAE6DA", // Beige
          padding: "3rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Center vertically
          alignItems: "center",
          gap: "2rem",
          zIndex: 4000,
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)", // Smooth drawer
          boxShadow: "5px 0 25px rgba(0,0,0,0.3)", // Shadow to right
        }}
      >
        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem", alignItems: "center" }}>
          {menuItems.map((item) => (
            <span
              key={item.key}
              onClick={() => {
                setActiveGallery(item.key);
                setMobileMenuExpanded(false);
              }}
              style={{
                fontSize: "1rem",
                color: "#1a1a1a", // Dark text
                cursor: "pointer",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: "400",
                fontFamily: ["PFTransport", "sans-serif"], // Use custom font
              }}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Bottom Logo (Dark) */}
        <div style={{ marginTop: "auto", marginBottom: "2rem", opacity: 0.8 }}>
          <img
            src="/worldsonstage.png"
            alt="Logo"
            style={{ width: "80px", filter: "invert(1) brightness(0.5)" }} // Make it dark
          />
        </div>
      </div>

      {/* Search Overlay Backdrop (Click to close) */}
      {mobileMenuExpanded && (
        <div
          onClick={() => setMobileMenuExpanded(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 3500,
            cursor: "pointer"
          }}
        />
      )}

      {/* --- More Info button (Fixed Position) --- */}
      {activeGallery !== "home" && infoTexts[activeGallery] && (
        <span
          className="more-info-button"
          onClick={() => setShowInfo(true)}
          style={{
            position: "fixed",
            top: "6rem",
            right: "2rem",
            zIndex: 2500,
            cursor: "pointer",
            color: "#ccc",
            border: "1px solid #777",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            background: "rgba(0,0,0,0.5)"
          }}
        >
          More Info
        </span>
      )}


      {/* --- CONTENT --- */}
      <div className="app-container">
        <AnimatePresence mode="wait">
          {activeGallery === "home" ? (
            <motion.div
              key={`home-${currentHomeIndex}`} // unique key triggers animation
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }} // Slower, smoother fade
              className="home-hero-image"
              style={{
                backgroundImage: `url(${galleries.home[currentHomeIndex].src})`,
                "--mobile-pos": galleries.home[currentHomeIndex].mobilePosition || "center",
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

        {/* --- Slideshow Indicators (Home Only) --- */}
        {activeGallery === "home" && <div style={{
          position: "fixed",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          zIndex: 2000,
        }}>
          {galleries.home.map((_, idx) => (
            <React.Fragment key={idx}>
              <span
                onClick={() => setCurrentHomeIndex(idx)}
                style={{
                  color: currentHomeIndex === idx ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: currentHomeIndex === idx ? "bold" : "normal",
                  transition: "color 0.3s ease",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              {/* Progress Line after active item (except last) */}
              {currentHomeIndex === idx && idx < galleries.home.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40px" }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{
                    height: "2px",
                    background: "#fff",
                    boxShadow: "0 0 4px rgba(0,0,0,0.5)"
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        }
      </div>

      {/* --- LIGHTBOX with custom slide for hotspots --- */}
      {
        activeGallery !== "home" && (
          <Lightbox
            open={open}
            close={() => {
              setOpen(false);
              setShowHotspots(false);
            }}
            index={index}
            on={{ view: ({ index: newIndex }) => setIndex(newIndex) }}
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
        )
      }

      {/* --- INFO OVERLAY --- */}
      {
        showInfo && (
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
        )
      }

      {/* --- Toggle Button (Mobile Only) - PORTAL for Z-INDEX --- */}
      {
        activeGallery !== "home" && ReactDOM.createPortal(
          <div
            className="menu-toggle-btn"
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
        )
      }

    </div >
  );
}

export default App;
