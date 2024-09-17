export const Label: React.FC<{
  children?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  onClick?: () => void;
}> = ({ children, required, htmlFor, className, onClick }) => (
  <label
    htmlFor={htmlFor}
    className={`block leading-none ${
      htmlFor ? "cursor-pointer" : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
    {required && <span className="text-error">*</span>}
  </label>
);
