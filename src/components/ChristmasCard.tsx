import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "@fontsource/pacifico";


const ChristmasCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(""); // Nome digitato nel campo input
  const [finalName, setFinalName] = useState("Amico/a"); // Nome fisso mostrato dopo i saluti
  const [shareLink, setShareLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Funzione per aprire la lettera
  const handleOpenLetter = () => {
    setIsOpen(true);
    if(audioRef.current) {
      audioRef.current.play();
    }
  };

  // Funzione per generare il link personalizzato
  const generateShareLink = () => {
    const trimmedName = name.trim() || "Amico/a"; // Usa "Amico/a" se il nome è vuoto
    const link = `${window.location.origin}?name=${encodeURIComponent(
      trimmedName
    )}`;
    setShareLink(link);
    setCopySuccess(false); // Resetta il messaggio di copia avvenuta
  };

  // Recupera il nome dall'URL (solo all'inizio)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    if (urlName) {
      setFinalName(urlName); // Imposta il nome fisso mostrato nel messaggio
    }
  }, []);

  // Funzione per copiare il link negli appunti
  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        setCopySuccess(true); // Mostra il messaggio di successo
        setTimeout(() => setCopySuccess(false), 2000); // Nasconde il messaggio dopo 2 secondi
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/natale.jpg')`, // Percorso immagine sfondo
      }}
    >

       {/* Elemento audio */}
       <audio ref={audioRef} src="/All_I_Want_For_Christmas_Is_You.mp3" loop /> {/* Musica di Natale */}

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
              <motion.div whileHover={{ scale: 1.1 }}>
                <h2 className="text-white font-bold text-lg bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                  📩 Clicca per aprire
                </h2>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Lettera aperta */}
        {isOpen && (
          <motion.div
            className="w-80 h-auto bg-white rounded-lg shadow-lg p-6"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 
              className="text-xl font-bold text-center text-red-500 mb-4"
              style={{ fontFamily: "Pacifico" }}
            >
              🎄 Tanti auguri di un sereno e felice Natale!
            </h2>
            <p className="text-center text-gray-700 mb-6">
            Buone feste da <span className="font-bold">{finalName}</span>
            </p>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Inserisci il tuo nome per generare il link:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={generateShareLink}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Genera link di condivisione 🎁
            </button>
            {shareLink && (
              <div className="mt-4 text-sm text-center">
                <p>Condividi questo link:</p>
                <div className="flex items-center justify-center space-x-2">
                  <a
                    href={shareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline break-words"
                  >
                    {shareLink}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Copia
                  </button>
                </div>
                {copySuccess && (
                  <p className="mt-2 text-green-500 font-bold">
                    Link copiato negli appunti!
                  </p>
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
