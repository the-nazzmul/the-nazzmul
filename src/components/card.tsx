import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "bg-gray-800 rounded-3xl z-0 after:z-10 overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none",
        className
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none  -z-10 opacity-5"
        style={{ backgroundImage: `url(${"/grain.jpg"})` }}
      />
      {children}
    </div>
  );
};

export default Card;
