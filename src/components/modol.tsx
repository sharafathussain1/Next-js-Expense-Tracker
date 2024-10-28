import { RiCloseLargeFill } from "react-icons/ri";

export default function Modol({ ModelOpen, setModelOpen, children }) {
  return (
    <div className="model-parent h-full flex justify-center ">
      {/* make a conditional rendering of modol */}
      <div
        className="moddol rounded-r-3xl bg-slate-700 transition-all duration-800s z-50"
        style={{
          transform: ModelOpen ? "translateX(0%)" : "translateX(-200%)",
        }}
      >
        <p
          className="  close-icon text-2xl top-4 left-4  cursor-pointer"
          onClick={() => setModelOpen(false)}
        >
          <RiCloseLargeFill />
        </p>

        {children}
      </div>
    </div>
  );
}
