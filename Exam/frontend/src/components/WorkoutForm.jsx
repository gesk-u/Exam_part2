import { useState } from "react";
import { FIELDS } from "../config";
import { emptyValues, toPayload } from "../utils/fields";

const WorkoutForm = ({ fields = FIELDS, initialValues, submitLabel = "Save", onSubmit }) => {
  const [values, setValues] = useState(initialValues || emptyValues(fields));
  const [error, setError] = useState(null);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(toPayload(values, fields));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((f) => {
        const props = {
          id: f.name,
          name: f.name,
          value: values[f.name],
          onChange: handleChange,
          required: f.required,
        };
        return (
          <div key={f.name}>
            <label htmlFor={f.name}>{f.label}:</label>
            {f.type === "select" ? (
              <select {...props}>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...props} />
            ) : (
              <input type={f.type || "text"} step={f.type === "number" ? "any" : undefined} min={f.min} {...props} />
            )}
          </div>
        );
      })}
      <button>{submitLabel}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;