export default function GreenBtn({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`${className} bg-brand-green hover:font-brand-green hover:bg-white border hover:border-brand-green font-bold text-white text-sm rounded-md transition-all duration-400 cursor-pointer`}
    >
      {children}
    </button>
  );
}
