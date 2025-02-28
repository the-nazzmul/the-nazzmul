interface ISectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader = ({ title, description }: ISectionHeaderProps) => {
  return (
    <>
      <h2 className="font-serif text-3xl uppercase font-semibold tracking-widest bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600  text-center text-transparent bg-clip-text md:text-5xl mt-6">
        {title}
      </h2>
      <p className="text-center text-white/60 mt-4 md:text-lg max-w-md mx-auto lg:text-xl">
        {description}
      </p>
    </>
  );
};

export default SectionHeader;
