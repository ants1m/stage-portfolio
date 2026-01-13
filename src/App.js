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
        src: "/whereareyoumylovesfendonh-32_v2.avif",
        title: "Antigone 2",
        mobilePos: "10% 50%",
      },
      {
        src: "/cabaret_2-2.avif",
        title: "Cabaret Highlight",
        mobilePos: "50% 20%",
      },
      {
        src: "/o_vasiikos_theatro_simeio-102.jpg",
        title: "Vasilikos Highlight",
        mobilePos: "50% 15%",
      },
      {
        src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-8.avif",
        title: "Cabaret Atmosphere",
        mobilePos: "85% 30%",
      },
      {
        src: "/o_vasiikos_theatro_simeio-18.jpg",
        title: "Vasilikos Scene",
        mobilePos: "50% 50%",
      },
      {
        src: "/whereareyoumylovesfendonh-25_v2.avif",
        title: "Where Are You My Love Duo",
        mobilePos: "50% 30%",
      },
      {
        src: "/cabaret_teleutaia_stigmi_athens_conservatoire_drama_school-47.avif",
        title: "Cabaret Focus",
        mobilePos: "50% 10%",
      },
    ],
    o_vasilikos: [
      {
        src: "/o_vasiikos_theatro_simeio-102.avif",
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
        src: "/o_vasiikos_theatro_simeio-43.avif",
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
        src: "/o_vasiikos_theatro_simeio-89.avif",
        title: "Vasilikos 4",
      },
      {
        src: "/o_vasiikos_theatro_simeio-18.avif",
        title: "Vasilikos 5",
      },
      {
        src: "/o_vasiikos_theatro_simeio-41.avif",
        title: "Vasilikos 6",
      },
      {
        src: "/o_vasiikos_theatro_simeio-54.avif",
        title: "Vasilikos 7",
      },
      {
        src: "/o_vasiikos_theatro_simeio-48.avif",
        title: "Vasilikos 8",
      },
      {
        src: "/o_vasiikos_theatro_simeio-66.avif",
        title: "Vasilikos 9",
      },
      {
        src: "/o_vasiikos_theatro_simeio-80.avif",
        title: "Vasilikos 10",
      },
      {
        src: "/o_vasiikos_theatro_simeio-99.avif",
        title: "Vasilikos 11",
      },
      {
        src: "/o_vasiikos_theatro_simeio-72.avif",
        title: "Vasilikos 12",
      },
      {
        src: "/o_vasiikos_theatro_simeio-84.avif",
        title: "Vasilikos 13",
      },
      {
        src: "/o_vasiikos_theatro_simeio-95.avif",
        title: "Vasilikos 14",
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
        src: "/amphitheatriko-2.avif",
        title: "Amphitheatriko 2",
      },
      {
        src: "/amphitheatriko-banner.avif",
        title: "Amphitheatriko Banner",
      },
      {
        src: "/amphitheatriko-1.avif",
        title: "Amphitheatriko 1",
      },
    ],
    whereareyoumylove: [
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
        src: "/whereareyoumylovesfendonh-25_v2.avif",
        title: "Where Are You My Love Duo",
      },
      {
        src: "/whereareyoumylovesfendonh-28 copy.avif",
        title: "Where Are You My Love 6",
      },
      {
        src: "/whereareyoumylovesfendonh-32 copy.avif",
        title: "Where Are You My Love 7",
      },
      {
        src: "/wayml-1.avif",
        title: "Wayml 1",
      },
      {
        src: "/wayml-2.avif",
        title: "Wayml 2",
      },
      {
        src: "/wayml-3.avif",
        title: "Wayml 3",
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
    endgame: [
      { src: "/endgame-1.avif", title: "Endgame 1" },
      { src: "/endgame-2.avif", title: "Endgame 2" },
      { src: "/endgame-3.avif", title: "Endgame 3" },
    ],
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
    cabaret: `
Συμμετέχοντες:

Το Γ’ έτος της Δραματικής Σχολής.

Αλφαβητικά:

Ινώ Αθανασιάδου
Άννα Γκαραφλή
Κατερίνα Θεοδώρου
Βάλια Κουμπή
Στέλιος Κράτσας
Λήδα Κτώνα
Άγγελος Μαγνήσαλης
Κλειώ Παπαντζανάκη – Χρυσοβέργη
Χριστίνα Παρασκευά
Φοίβος Παυλόπουλος
Κλάρα Σαντίκου
Αντώνης Σκύβαλος
Γεωργία Σπυροπούλου
Βασίλης Σύρρος
Κλαύδιος Τσούκα

Παρασκευή 20 & Σάββατο 21 Δεκεμβρίου 2024, Ώρα 20:00
Αίθουσα Black Box
    `,
    amphitheatriko: `
Σκηνοθεσία
Αλεξάνδρα Καζάζου (Καθηγήτρια Υποκριτικής της Δραματικής Σχολής του Ωδείου Αθηνών)

Δραματουργική επεξεργασία
Γιώτα Χνάρη, Αλεξάνδρα Καζάζου, Θωμάς Μακρυγιάννης, Χρήστος Μαρκόπουλος, Πέτρος Πίγκας

Μουσική σύνθεση
Άγγελος Παππάς, Δανάη Γεωργούλα, Αλίνα Τσιαμπούλα

Ηθοποιοί

Σπουδαστές & Σπουδάστριες του Δ’ έτους της Δραματικής Σχολής του Ωδείου Αθηνών:

Καλλιόπη Ανταμπούφη, Άρτεμις Βαλτζάκη, Δανάη Γεωργούλα, Αγγελική Δεληθανάση, Βασίλης Ζαφειρόπουλος, Μαργαρίτα Κλάγκου, Κονδυλία Κωνσταντελάκη, Θωμάς Μακρυγιάννης, Χρήστος Μαρκόπουλος, Νάντια Μπαϊμπά, Άγγελος Παππάς, Σόλωνας Πετρακόπουλος, Πέτρος Πίγκας, Αλεξάνδρα  Ρουβέλα,  Πέννυ Σακελλαριάδη,  Γιάννης Σιάμπαλιας,  Αλίνα Τσιαμπούλα, Γιώτα Χνάρη

Μουσικοί

Κιθάρα: Άγγελος Παππάς
Τσέλο: Δανάη Γεωργούλα
Μπεντίρ: Αλίνα Τσιαμπούλα
    `,
    giagia: `
Συντελεστές
Σκηνοθεσία: Γιώργος Παύλου
Εποπτεία: Έλενα Τριανταφυλλοπούλου
Δραματουργία: Άρτεμις Ψιλοπούλου

Σκηνοθετικό σημείωμα: Η γιαγιά έχει άνοια. Όλοι και όλες προσπαθούν να της θυμίσουν κάτι απ’ τα “παλιά”, να ταρακουνήσουν τη μνήμη της, να την κρατήσουν ζωντανή μέσα απο το παρελθόν. Ενώ η οικογένεια προσπαθεί να ερεθίσει τη μνήμη της γιαγιάς, αποκαλύπτεται πως το παρελθόν έχει πια πεθάνει, τίποτα απο τον κόσμο της γιαγιάς δεν υπάρχει πια.

Μήπως το τέλος του κόσμου επαναλαμβάνεται συνεχώς κι εμείς δεν είμαστε εδώ για να το δούμε;

Ερμηνεύουν: Κονδυλία Κωνσταντελάκη, Καλλιόπη Ανταμπούφη, Δανάη Γεωργούλα, Βασίλης Ζαφειρόπουλος, Αλίνα Τσιαμπούλα, Αλεξάνδρα Ρουβέλα, Σόλωνας Πετρακόπουλος, Γιώτα Χνάρη, Θωμάς Μακρυγιάννης
    `,
    endgame: `
Endgame
4 ημέρες και 7 λεπτά

από Κυριακή 9 Νοεμβρίου 2025
στις 21:00

Θέατρο ΜΙΚΡΟΣ ΚΕΡΑΜΕΙΚΟΣ



Endgame 4 ημέρες και 7 λεπτά

Τέλος ή αρχή; Σε τέσσερις μέρες και επτά λεπτά, ο κόσμος όπως τον ξέρουμε θα τελειώσει από την πτώση ενός μετεωρίτη. Τέσσερις γυναίκες καταφεύγουν σε ένα υπόγειο, ηχογραφώντας ιστορίες για τον μελλοντικό αρχαιολόγο. Θραύσματα εξομολογήσεων που ανασύρουν μνήμες, επιθυμίες και τραυματικές απώλειες, σε μια σκηνική σύνθεση όπου η αγωνία και το χιούμορ συναντούν τον έρωτα, την αγάπη και την ανάγκη για λύτρωση. «Endgame» στιγμές παράδοξου αδιεξόδου, με την πολυφωνία των επεισοδίων να ξυπνά αναλογίες με το δεκαήμερο του Βοκάκιου, μικρές ιστορίες αστείες, ωμές, ανθρώπινες.

Η αιχμηρή, τρυφερή και σαρκαστική γλώσσα της Γλυκερίας Μπασδέκη διαπερνά το έργο σαν ηλεκτρισμός, ενώ η λαϊκή τέχνη του θεάτρου σκιών, με την υπογραφή του Άθου Δανέλλη, φωτίζει τις φωνές των γυναικών, χαρίζοντας στην παράσταση μια διάσταση συλλογικής μνήμης, υπέρβασης και χιούμορ, ακόμα και μπροστά στο τέλος του κόσμου...και όπως λέει και η μαμά Γλυκερία "Μακάρι η ιερή τρέλλα και η ευαισθησία να σκίσει τα νερά και να σωθεί πολύς κοσμάκης στην ακτή".

ΣΥΝΤΕΛΕΣΤΕΣ

Κείμενα: Γλυκερία Μπασδέκη
Σκηνοθεσία: Ρουμπίνη Φέφε & η Ομάδα "Παναγνώστου"
Δραματουργία: Ρουμπίνη Φέφε
Βοηθός Δραματουργίας - σκηνοθεσίας: Ράνια Πολυχρονάκη
Ερμηνεύουν: Νιόβη Γαβριήλ, Ράνια Πολυχρονάκη, Έλενα Τσέλιου, Ρουμπίνη Φέφε
Θέατρο Σκιών: Άθως Δανέλλης
Σκηνογραφία: Ράνια Πολυχρονάκη
Φωτισμοί: Χριστίνα Φυλακτοπούλου
Πρωτότυπη Μουσική Σύνθεση: Έλενα Τσέλιου & Λουκάς Μποράκης
Κατασκευή Φιγούρας Θεάτρου Σκιών: Δημήτρης Μπάκος
Βοηθοί Θεάτρου Σκιών: Γρηγόρης Μωράκης & Δημήτρης Μπάκος
Μουσική επιμέλεια: Έλενα Τσέλιου
Επικοινωνία: Γιώτα Δημητριάδη
 
Μια παραγωγή της Αστικής μη Κερδοσκοπικής Εταιρείας BATEAU LAVOIR, στο Θέατρο «Μικρός Κεραμεικός»
    `,
  };

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "o_vasilikos", label: "Ο ΒΑΣΙΛΙΚΟΣ" },
    { key: "giagia", label: "ΓΙΑΓΙΑ, ΟΛΑ ΜΙΑ ΜΕΡΑ ΘΑ ΠΕΘΑΝΟΥΝ" },
    { key: "amphitheatriko", label: "ΑΜΦΙ-ΘΕΑΤΡΙΚΟ" },
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
          src="/WORLDS_NEW.webp"
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
            // justifyContent: "space-between", // Let children flex control spacing
            alignItems: "center",
            zIndex: 3000,
          }}>
          {/* MENU Text - Triggers Menu */}
          <span
            onClick={() => setMobileMenuExpanded(true)}
            style={{
              flex: 1,
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
            src="/WORLDS_NEW.webp"
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
              flex: 1,
              textAlign: "right",
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
      {/* --- Mobile Menu Backdrop --- */}
      <div
        onClick={() => setMobileMenuExpanded(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          zIndex: 3999,
          opacity: mobileMenuExpanded ? 1 : 0,
          pointerEvents: mobileMenuExpanded ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* --- MOBILE Menu Side Drawer --- */}
      {/* --- MOBILE Menu Side Drawer --- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "60%", // Sharper, narrower drawer
          maxWidth: "320px", // Reduced max width too
          background: "rgba(91, 7, 7, 0.8)", // Even more transparent
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          zIndex: 4000,
          transform: mobileMenuExpanded ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "5px 0 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Mobile Nav Items */}
        {menuItems.map((item) => (
          <span
            key={item.key}
            onClick={() => {
              setActiveGallery(item.key);
              setMobileMenuExpanded(false);
            }}
            style={{
              fontSize: "1.1rem", // Smaller, elegant
              color: "#F2F0E9", // Light Cream text
              cursor: "pointer",
              letterSpacing: "2px", // Wide spacing
              textTransform: "uppercase",
              fontFamily: "'PFTransport', sans-serif", // Serif look
              fontWeight: activeGallery === item.key ? "600" : "500",
              borderBottom: activeGallery === item.key ? "1px solid #F2F0E9" : "none",
              paddingBottom: "4px",
              transition: "all 0.3s ease",
              textAlign: "center", // Center wrapped text
            }}
          >
            {item.label}
          </span>
        ))}

        {/* Bottom branding */}
        <div style={{ position: "absolute", bottom: "3rem", opacity: 0.8 }}>
          {/* Using text initials JR style or just logo if dark-compatible */}
          <img src="/WORLDS_NEW.webp" alt="Logo" style={{ width: "60px" }} />
        </div>
      </div>

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
                backgroundPosition: galleries.home[currentHomeIndex].mobilePos || "center center",
                backgroundSize: "cover",
              }}
            />
          ) : activeGallery === "amphitheatriko" ? (
            /* Banner Layout for Amphitheatriko (Stacked, No Gaps) */
            <motion.div
              key="amphitheatriko-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: "4rem" }}
            >
              {currentImages.map((img, idx) => (
                <div key={idx} style={{ width: "100%", marginBottom: 0, lineHeight: 0 }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                    onClick={() => {
                      // Optional: Still open lightbox? User only asked for display layout.
                      // But keeping interaction is usually good.
                      setIndex(idx);
                      setOpen(true);
                      setShowHotspots(false);
                    }}
                  />
                </div>
              ))}
            </motion.div>
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
                width: "90%", // Responsive width
                maxHeight: "85vh", // Limit height
                overflowY: "auto", // Scrollable content
                padding: "2rem",
                color: "#fff",
                textAlign: "center",
                whiteSpace: "pre-line",
                lineHeight: "1.6",
                fontSize: "1.1rem",
                borderRadius: "12px", // Smooth scroll container edge
                background: "rgba(0,0,0,0.5)", // Subtle bg for contrast
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
