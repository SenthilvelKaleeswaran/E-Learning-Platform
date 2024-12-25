export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; // Optional label text
    id: string; // Required for accessibility
    className?: string; // Optional class for the wrapper div
    labelClassName?: string; // Optional class for the label
    inputClassName?: string; // Optional class for the input
  }
  