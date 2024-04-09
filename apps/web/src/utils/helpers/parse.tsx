// Function to parse HTML string and convert it to JSX
export const parseStringToHTML = (htmlString: string) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }}
      className="overflow-hidden h-full w-full"
    />
  );
};
