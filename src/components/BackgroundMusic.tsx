import React, { useEffect, useRef } from "react";

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="your-christmas-music.mp3" type="audio/mp3" />
      Il tuo browser non supporta l'elemento audio.
    </audio>
  );
};

export default BackgroundMusic;
