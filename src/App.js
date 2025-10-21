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
  const [showInfo, setShowInfo] = useState(false);

  // --- All galleries ---
  const galleries = {
    home: [{ src: "/whereareyoumylovesfendonh-32.png", title: "Antigone 2" }],
    o_vasilikos: [
      { src: "/o_vasiikos_theatro_simeio-102.jpg", title: "Vasilikos" },
      { src: "/o_vasiikos_theatro_simeio-43.jpg", title: "Vasilikos 2" },
      { src: "/o_vasiikos_theatro_simeio-3.avif", title: "Vasilikos 3" },
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
      { src: "/whereareyoumylovesfendonh-2 copy.avif", title: "Where Are You My Love 1" },
      { src: "/whereareyoumylovesfendonh-9 (2) copy.avif", title: "Where Are You My Love 2" },
      { src: "/whereareyoumylovesfendonh-11 copy.avif", title: "Where Are You My Love 3" },
      { src: "/whereareyoumylovesfendonh-24 copy.avif", title: "Where Are You My Love 4" },
      { src: "/whereareyoumylovesfendonh-25 copy.avif", title: "Where Are You My Love 5" },
      { src: "/whereareyoumylovesfendonh-28 copy.avif", title: "Where Are You My Love 6" },
      { src: "/whereareyoumylovesfendonh-32 copy.avif", title: "Where Are You My Love 7" },
    ],
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
          position: "absolute",
          top: activeGallery === "home" ? "50%" : "1rem",
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
        {menuItems.map((item) => (
          <span
            key={item.key}
            onClick={() => {
              setActiveGallery(item.key);
              setOpen(false);
              setShowInfo(false);
            }}
            style={{
              cursor: "pointer",
              fontSize: activeGallery === item.key ? "1.6rem" : "1rem",
              color: activeGallery === item.key ? "red" : "#aaa",
              fontWeight: activeGallery === item.key ? "bold" : "normal",
              transition: "all 0.3s ease",
            }}
          >
            {item.label}
          </span>
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
            onClick={() => setShowInfo(true)}
            style={{
              cursor: "pointer",
              fontSize: "1rem",
              color: "#ccc",
              textDecoration: "underline",
              position: "absolute",
              right: "2rem",
              top: "1.2rem",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ccc")}
          >
            More Info
          </span>
        )}
      </div>

      {/* --- CONTENT --- */}
      <div style={{ padding: "2rem" }}>
        {activeGallery === "home" ? (
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginTop: "4rem",
              justifyItems: "center",
              alignItems: "center",
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
                  background: "transparent",
                  padding: "0.5rem",
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
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
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
    </div>
  );
}

export default App;
