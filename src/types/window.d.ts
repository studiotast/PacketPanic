// Add this to window interface to recognize initiatePhaseTransition method
declare global {
  interface Window {
    initiatePhaseTransition: (phase: string) => void;
  }
}
