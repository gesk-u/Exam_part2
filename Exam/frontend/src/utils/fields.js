import { FIELDS } from "../config";

export const getValue = (obj, path) =>
  path.split(".").reduce((o, key) => (o == null ? undefined : o[key]), obj);

export const setValue = (obj, path, value) => {
  const [key, ...rest] = path.split(".");
  return { ...obj, [key]: rest.length ? setValue(obj[key] || {}, rest.join("."), value) : value };
};

// blank form
export const emptyValues = (fields = FIELDS) =>
  Object.fromEntries(
    fields.map((f) => [f.name, f.default ?? (f.type === "select" ? f.options[0] : "")])
  );

// item from API -> form values (dates cut to YYYY-MM-DD for <input type="date">)
export const toFormValues = (item, fields = FIELDS) =>
  Object.fromEntries(
    fields.map((f) => {
      const v = getValue(item, f.name);
      if (v == null) return [f.name, ""];
      return [f.name, f.type === "date" ? String(v).slice(0, 10) : v];
    })
  );

// form values -> nested object for the API (numbers converted, empty optional fields skipped)
export const toPayload = (values, fields = FIELDS) =>
  fields.reduce((obj, f) => {
    let v = values[f.name];
    if (v === "" && !f.required) return obj;
    if (f.type === "number") v = Number(v);
    return setValue(obj, f.name, v);
  }, {});

// value for display
export const formatValue = (item, f) => {
  const v = getValue(item, f.name);
  if (v == null || v === "") return "-";
  return f.type === "date" ? new Date(v).toLocaleDateString() : String(v);
};