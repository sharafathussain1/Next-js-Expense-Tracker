import { RiCloseLargeFill } from "react-icons/ri";
type modalType = {
  ModelOpen: boolean;
  setModelOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export default function Modol({
  ModelOpen,
  setModelOpen,
  children,
}: modalType) {
  const modalHandler = () => {
    setModelOpen(false);
  };
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
          className="  close-icon text-2xl top-4 left-4  cursor-pointer font-bold text-slate-950"
          onClick={modalHandler}
        >
          <RiCloseLargeFill />
        </p>

        {children}
      </div>
    </div>
  );
}
