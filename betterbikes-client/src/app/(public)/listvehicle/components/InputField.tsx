interface Props {
  placeholder: string;
  label: string;
  errors: any;
  type: string;
  field?: object;
}

export default function InputField(props: Props) {
  return (
    <div>
      <label
        className="text-gray-400 font-semibold text-sm"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <input
        className={`block w-full px-4 py-3 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
          props.errors ? "border-red-500" : ""
        }`}
        {...props.field}
        type={props.type}
        placeholder={props.placeholder}
      />
      {props.errors ? <p className="text-red-500">{props.errors}</p> : ""}
    </div>
  );
}
