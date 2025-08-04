import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

export function useStepSound() {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/bell.mp3"),
        { volume: 1.0 }
      );
      soundRef.current = sound;
    })();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    if (!soundRef.current) return;
    await soundRef.current.replayAsync();
  };

  return { playSound };
}
