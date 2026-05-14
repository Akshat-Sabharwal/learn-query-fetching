export const Loader = ({ size = "lg" }) => {
  return (
    <span
      className={`${size === "lg" ? "size-18" : size === "md" ? "size-15" : "size-12"} bg-transparent border-6 border-gray-600 rounded-full border-t-transparent animate-spin duration-300`}
    ></span>
  );
};
