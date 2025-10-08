// Background.jsx
import Threads from "../components/Threads";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
    </div>
  );
}
