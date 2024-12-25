export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; 
  id: string; 
  className?: string; 
  labelClassName?: string;
  inputClassName?: string; 
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  className?: string; 
  type?: "button" | "submit";
}
