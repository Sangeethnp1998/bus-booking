/* eslint-disable react/prop-types */
export const Button = ({
  children,
  onClick,
  type = "button",
  isPrimary = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-9 rounded border px-6 text-base font-medium ${isPrimary ? "border-slate-700 bg-slate-700 text-white" : "border-slate-300 bg-slate-100 text-slate-950"} `}
    >
      {children}
    </button>
  );
};
