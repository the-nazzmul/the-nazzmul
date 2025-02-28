import { ZapIcon } from "lucide-react";

const WORDS = [
  "Performance",
  "Accessible",
  "Artificial Intelligence",
  "Scalable",
  "Secure",
  "Maintainable",
  "Search  Optimization",
  "Reliable",
  "Responsive",
  "Optimized",
  "Robust",
  "User Friendly",
  "Customizable",
  "Modern",
  "Dynamic",
];

const TapeSection = () => {
  return (
    <section className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 overflow-x-clip -rotate-3 -mx-1">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 py-3">
            {WORDS.map((word) => (
              <div key={word} className="inline-flex gap-4 items-center">
                <span className="text-gray-900 uppercase font-extrabold text-sm">
                  {word}
                </span>
                <ZapIcon className="size-5 text-gray-900 fill-gray-900" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TapeSection;
