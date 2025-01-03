import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "@fontsource/pacifico";


 // Dizionario delle traduzioni
type Translations = {
  [key: string]: {
    clickToOpen: string;
    title: string;
    message: string;
    namePlaceholder: string;
    generateLink: string;
    copySuccess: string;
    shareMessage: string;
    noNameMessage: string;
  };
};

const translations: Translations = {
  en: {
    clickToOpen: "Click here to open",
    title: "🎄 Wishing you a Merry and Joyful Christmas! 🎄",
    message: "🎅 Warm wishes from",
    namePlaceholder: "Your name",
    generateLink: "Generate shareable link 🎁",
    copySuccess: "Link copied to clipboard!",
    shareMessage: "Copy",
    noNameMessage: "A sweet Christmas hug",
  },
  it: {
    clickToOpen: "Clicca qui per aprire",
    title: "🎄 Tanti auguri di un sereno e felice Natale! 🎄",
    message: "🎅 Buone feste da",
    namePlaceholder: "Il tuo nome",
    generateLink: "Genera link di condivisione 🎁",
    copySuccess: "Link copiato negli appunti!",
    shareMessage: "Copia",
    noNameMessage: "Un dolce abbraccio natalizio",
  },
  fr: {
    clickToOpen: "Cliquez ici pour ouvrir",
    title: "🎄 Joyeux Noël et Bonne Année! 🎄",
    message: "🎅 Meilleurs vœux de",
    namePlaceholder: "Votre nom",
    generateLink: "Générer un lien à partager 🎁",
    copySuccess: "Lien copié dans le presse-papiers!",
    shareMessage: "Copie",
    noNameMessage: "Un doux câlin de Noël",
  },
};



const ChristmasCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(""); // Nome digitato nel campo input
  const [finalName, setFinalName] = useState("Amico/a"); // Nome fisso mostrato dopo i saluti
  const [shareLink, setShareLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [locale, setLocale] = useState("en"); // Lingua corrente
  const audioRef = useRef<HTMLAudioElement>(null); // Riferimento all'elemento audio

  // Funzione per aprire la lettera
  const handleOpenLetter = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play(); // Avvia la musica
    }
  };


   // Dizionario per il titolo della pagina
 const titles = {
  en: "🎄 Merry Christmas Wishes 🎄",
  it: "🎄 Tanti auguri di Natale 🎄",
  fr: "🎄 Joyeux Noël 🎄",
};

 // Imposta il titolo della pagina in base alla lingua del dispositivo
 useEffect(() => {
  const userLanguage = navigator.language.slice(0, 2); // Ottieni la lingua del dispositivo (es. "en", "it")
  if (titles[userLanguage as keyof typeof titles]) {
    setLocale(userLanguage); // Imposta la lingua
  } else {
    setLocale("en"); // Fallback a "en"
  }
  document.title = titles[userLanguage as keyof typeof titles] || titles["en"]; // Cambia il titolo dinamicamente
}, []);

  // Funzione per generare il link personalizzato
  const generateShareLink = () => {
    const trimmedName = name.trim() || translations[locale].noNameMessage; // Usa noNameMessage se il nome è vuoto
    const link = `${window.location.origin}?name=${encodeURIComponent(trimmedName)}`;
    setShareLink(link);
    setCopySuccess(false); // Resetta il messaggio di copia
  };

  // Recupera il nome dall'URL (solo all'inizio) e imposta la lingua
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get("name");
  
      if (urlName) {
        // Decodifica il parametro 'name' e usa il valore, altrimenti fallback
        const decodedName = decodeURIComponent(urlName).trim();
        setFinalName(decodedName || translations[locale].noNameMessage);
      } else {
        // Se il parametro 'name' non è presente, usa il fallback
        setFinalName(translations[locale].noNameMessage);
      }
    } catch (error) {
      console.error("Errore durante la lettura dell'URL:", error);
      setFinalName(translations[locale].noNameMessage);
    }

     // Rileva la lingua del dispositivo
     const userLanguage = navigator.language.slice(0, 2); // Ottieni il codice della lingua (es. "en", "it")
     if (translations[userLanguage]) {
       setLocale(userLanguage); // Imposta la lingua se supportata
     } else {
       setLocale("en"); // Imposta inglese come fallback
     }

  }, [locale]);

  // Funzione per copiare il link negli appunti
  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        setCopySuccess(true); // Mostra il messaggio di successo
        setTimeout(() => setCopySuccess(false), 2000); // Nasconde il messaggio dopo 2 secondi
      });
    }
  };

   // Varianti per Framer Motion per animare ogni carattere
   const charVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1, // Ritardo progressivo per ogni carattere
      },
    }),
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/natale.jpg')`, // Percorso immagine sfondo
      }}
    >
      {/* Elemento audio */}
      <audio
        ref={audioRef}
        src="/All_I_Want_For_Christmas_Is_You.mp3"
        loop
      />{" "}
      {/* Musica di Natale */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Lettera chiusa */}
        {!isOpen && (
          <motion.div
            className="relative w-80 h-40 bg-cover bg-center rounded-lg shadow-lg cursor-pointer"
            onClick={handleOpenLetter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundImage: `url('/bustanatale.jpg')`, // Usa l'immagine caricata
            }}
          >
            {/* Testo sopra la busta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white font-bold text-lg bg-black bg-opacity-75 px-4 py-2 rounded-lg">
                📩 {translations[locale].clickToOpen}
              </h2>
            </div>
          </motion.div>
        )}

        {/* Lettera aperta */}
        {isOpen && (
          <motion.div
            className="w-80 h-auto bg-yellow-100 rounded-lg shadow-lg p-6 border-4 border-red-500"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Titolo con font Pacifico */}
            <motion.h2
              className="text-2xl font-bold text-center text-red-500 mb-4"
              style={{ fontFamily: "Pacifico" }}
            >
              {[...translations[locale].title].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            {/* Messaggio con font Pacifico */}
            <p
              className="text-center text-gray-700 mb-6"
              style={{ fontFamily: "Pacifico" }}
            >
              {finalName.trim() &&
              finalName !== translations[locale].noNameMessage ? (
                <>
                  {translations[locale].message}{" "}
                  <span className="font-bold text-green-600">{finalName}</span>
                </>
              ) : (
                <span className="text-green-700 font-bold">
                ✨ {translations[locale].noNameMessage} ✨
              </span>
              )}
            </p>

            {/* Campo di input per il nome */}
            <div className="mb-4">
             
              <input
                id="name"
                type="text"
                placeholder={translations[locale].namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-5 pr-4 py-2 border border-green-500 rounded-lg bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-red-500 font-bold italic text-center placeholder-gray-400 transition"
                style={{ fontFamily: "Pacifico", fontSize: "1.4rem" }}
              />
            </div>

            {/* Pulsante per generare il link */}
            <button
              onClick={generateShareLink}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
            >
              {translations[locale].generateLink}
            </button>
            {shareLink && (
              <div className="mt-4">
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  {/* Link generato */}
                  <p
                    className="text-sm text-blue-500 truncate"
                    title={shareLink}
                  >
                    {shareLink}
                  </p>
                  {/* Pulsante per copiare il link */}
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    {translations[locale].shareMessage}
                  </button>
                </div>
                {copySuccess && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <p className="mt-2 text-red-500 font-bold text-lg "
                      style={{ fontFamily: "Pacifico" ,fontSize: "1.4rem"}}
                    >
                      {translations[locale].copySuccess}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
export default ChristmasCard;
