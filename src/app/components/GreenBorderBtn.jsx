export default function GreenBorderBtn({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={` font-bold border rounded-md transition-all duration-400 cursor-pointer ${
        className.includes("red")
          ? "text-white hover:font-brand-medium-red hover:border-brand-medium-red hover:bg-white bg-brand-medium-red"
          : "bg-white border-brand-green font-brand-green hover:text-white hover:bg-brand-green"
      } ${className}`}
    >
      {children}
    </button>
  );
}
