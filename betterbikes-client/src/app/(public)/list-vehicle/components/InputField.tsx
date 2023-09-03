interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) {
  return (
    <div>
      <label className="text-gray-400 font-semibold text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        value={value}
        className={`block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
