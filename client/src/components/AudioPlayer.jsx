import { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ selectedSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const playSpecificSong = (songPath) => {
    const index = songs.findIndex((song) => song === songPath);
    if (index !== -1) {
      setCurrentSongIndex(index);
      playAudio();
    } else {
      console.error("Song not found");
    }
  };

  const songs = [
    "src\\assets\\Audio\\Neil Cowley TrioGrace - Neil Cowley Trio.mp3",
    "src\\assets\\Audio\\Nils FrahmBecause This Must Be - Nils Frahm.mp3",
    "src\\assets\\Audio\\Nils FrahmSome - Nils Frahm.mp3",
    "src\\assets\\Audio\\OnekeRays of Hope - Oneke.mp3",
    "src\\assets\\Audio\\Oskar SchusterKyiv - Oskar Schuster.mp3",
    "src\\assets\\Audio\\Oskar SchusterTristane - Oskar Schuster.mp3",
    "src\\assets\\Audio\\Ossie WoodsLes Nouveaux Riches - Ossie Woods.mp3",
    "src\\assets\\Audio\\Otto A TotlandPino - Otto A Totland.mp3",
    "src\\assets\\Audio\\Otto WahlAwakening - Otto Wahl.mp3",
    "src\\assets\\Audio\\Otto WahlMoods Of The Valley - Otto Wahl.mp3",
    "src\\assets\\Audio\\OzymandiasI Miss You - Ozymandias.mp3",
    "src\\assets\\Audio\\Peter Bradley AdamsInterlude for Piano - Peter Bradley Adams.mp3",
    "src\\assets\\Audio\\Peter BroderickEyes Closed and Traveling - Peter Broderick.mp3",
    "src\\assets\\Audio\\PhildelQi - Phildel.mp3",
    "src\\assets\\Audio\\Philip WesleyThe Approaching Night - Philip Wesley.mp3",
    "src\\assets\\Audio\\Piano NovelEnchantement - Piano Novel.mp3"
  ]

  useEffect(() => {
    console.log(selectedSong);
    playSpecificSong(selectedSong)
  }, [selectedSong])

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex];
    localStorage.setItem('current', songs[currentSongIndex]);
    
    if (isPlaying) {
      playAudio();
    }
  }, [currentSongIndex]);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1) % songs.length);
  };

  return (
    <div className="fixed bottom-10 right-0 z-50 px-2 py-5 bg-gif flex rounded-s-lg gap-5 transition-all duration-200 group translate-x-[26rem] hover:translate-x-0 shadow-lg">
      <audio ref={audioRef} onEnded={handleNextSong} />
      <div className="items-center justify-center me-auto flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" id="music" fill='#00687F'><g data-name="Layer 2"><g data-name="music"><rect width="24" height="24" opacity="0"></rect><path d="M19 15V4a1 1 0 0 0-.38-.78 1 1 0 0 0-.84-.2l-9 2A1 1 0 0 0 8 6v8.34a3.49 3.49 0 1 0 2 3.18 4.36 4.36 0 0 0 0-.52V6.8l7-1.55v7.09a3.49 3.49 0 1 0 2 3.17 4.57 4.57 0 0 0 0-.51z"></path></g></g></svg>
        <span className="text-sm text-my-color font-semibold w-64 truncate">{songs[currentSongIndex].split('\\').pop().split('.')[0]}</span>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <div className="flex items-center justify-center mx-auto mb-1 gap-1">
            <button onClick={handlePrevSong} type="button" className="p-2.5 group rounded-full bg-white me-1 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" id="previous" className="fill-current text-my-color hover:text-teal-200"><path d="M13.75 13.0351C13.75 13.8459 12.8357 14.3196 12.1733 13.852L5.04034 8.81698C4.47592 8.41857 4.47592 7.58146 5.04034 7.18305L12.1733 2.14801C12.8357 1.68042 13.75 2.15416 13.75 2.96498L13.75 13.0351zM1.75 13.25C1.75 13.6642 2.08579 14 2.5 14 2.91421 14 3.25 13.6642 3.25 13.25L3.25 2.75C3.25 2.33579 2.91421 2 2.5 2 2.08579 2 1.75 2.33579 1.75 2.75V13.25z"></path></svg>
            </button>

            <button onClick={togglePlayPause} type="button" className="p-1.5 group rounded-full bg-white me-1 focus:outline-none">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="pause" className="fill-current text-my-color hover:text-teal-200">
                  <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="play" className="fill-current text-my-color hover:text-teal-200">
                  <path d="M7 17.259V6.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 7 17.259Z"></path>
                </svg>
              )}
            </button>

            <button onClick={handleNextSong} type="button" className="p-2.5 group rounded-full bg-white me-1 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" id="next" className="fill-current text-my-color hover:text-teal-200"><path d="M2 2.96495C2 2.15413 2.91427 1.68039 3.57668 2.14798L10.7097 7.18302C11.2741 7.58143 11.2741 8.41854 10.7097 8.81695L3.57668 13.852C2.91427 14.3196 2 13.8458 2 13.035V2.96495zM14 2.75C14 2.33579 13.6642 2 13.25 2 12.8358 2 12.5 2.33579 12.5 2.75V13.25C12.5 13.6642 12.8358 14 13.25 14 13.6642 14 14 13.6642 14 13.25V2.75z"></path></svg>
            </button>
          </div>
          {/* Progress bar, time display, and other elements */}
        </div>
      </div>
      {/* Other elements */}
    </div>
  );
};

export default AudioPlayer;
