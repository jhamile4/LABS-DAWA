import { InputHTMLAttributes } from "react";

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="h-4 w-4 accent-slate-950" type="checkbox" {...props} />;
}
