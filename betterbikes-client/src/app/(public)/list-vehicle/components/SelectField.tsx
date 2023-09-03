interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options?: string[];
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  options,
}: SelectFieldProps) {
  return (
    <div className="w-full">
      <label className="text-gray-400 font-semibold text-sm" htmlFor={name}>
        {label}
      </label>
      <select
        className={`block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
          error ? "border-red-500" : ""
        }`}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option>{label}</option>
        {options?.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
