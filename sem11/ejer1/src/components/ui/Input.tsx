import styles from "./Input.module.css";

type InputProps = {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
};

export default function Input({
  error,
  label,
  onChange,
  type = "text",
  value,
}: InputProps) {
  return (
    <div>
      <div className={styles.field}>
        <input
          className={`${styles.input} ${error ? styles.error : ""}`}
          onChange={(event) => onChange(event.target.value)}
          placeholder=" "
          type={type}
          value={value}
        />
        <label className={styles.label}>{label}</label>
      </div>
      {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}
