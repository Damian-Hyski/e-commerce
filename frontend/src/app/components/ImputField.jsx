export function InputField({
  type,
  name,
  id,
  label,
  autoComplete,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        className="rounded-3xl border border-dark px-4 py-2"
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
