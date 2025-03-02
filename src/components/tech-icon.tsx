import Image from "next/image";

const TechIcon = ({ iconUrl }: { iconUrl: string }) => {
  return (
    <Image
      src={iconUrl}
      alt="icon"
      width={50}
      height={50}
      className="rounded-xl"
    />
  );
};

export default TechIcon;
