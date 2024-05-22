type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <h2 className="text-center text-3xl font-semibold uppercase leading-7 text-[#161C2D]">
      {text}
    </h2>
  );
};

export default SectionTitle;
