type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export default function Button({
  text,
  onClick,
  className,
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
}
