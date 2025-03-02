import { twMerge } from "tailwind-merge";
import TechIcon from "./tech-icon";

export const ToolboxItems = ({
  techStack,
  className,
}: {
  techStack: { name: string; iconUrl: string }[];
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div className="flex *:flex-none py-0.5 gap-6">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="inline-flex items-center gap-4 py-2 px-3 outline outline-2 outline-white/10 rounded-lg"
          >
            <div className="bg-white rounded-xl p-1 max-w-fit">
              <TechIcon iconUrl={tech.iconUrl} />
            </div>
            <span className="font-semibold">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
