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

export interface VideoProps {
  src: string;
  type?: string;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  preload?: "none" | "auto";
  className? : any
  captions?: {
    src: string;
    kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
    srcLang?: string;
    label?: string;
  };
}
