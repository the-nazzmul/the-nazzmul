import Image from "next/image";

const TechIcon = ({ iconUrl }: { iconUrl: string }) => {
  return (
    <Image
      src={iconUrl}
      alt="icon"
      width={40}
      height={40}
      className="rounded-[8px]"
      priority
    />
  );
};

export default TechIcon;
