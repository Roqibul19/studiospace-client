"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { STUDIO_CATEGORIES } from "@/lib/navigation";
import { isValidHttpUrl } from "@/lib/validation";

const COMMON_AMENITIES = [
  "High-Speed WiFi",
  "Parking",
  "Air Conditioning",
  "Soundproofing",
  "Natural Light",
  "Lighting Kit",
  "Changing Room",
  "Green Screen",
  "Power Backup",
  "Restroom",
];

const EMPTY_STUDIO = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  image: "",
  amenities: [],
  overview: "",
};

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Please enter a title.";
  if (!values.category) errors.category = "Please choose a category.";
  if (!(Number(values.hourlyRate) > 0)) {
    errors.hourlyRate = "Hourly rate must be more than 0.";
  }
  if (values.securityDeposit === "" || !(Number(values.securityDeposit) >= 0)) {
    errors.securityDeposit = "Security deposit must be 0 or more.";
  }
  const capacity = Number(values.maxCapacity);
  if (!Number.isInteger(capacity) || capacity < 1) {
    errors.maxCapacity = "Capacity must be a whole number of at least 1.";
  }
  if (!values.location.trim()) errors.location = "Please enter a location.";
  if (!isValidHttpUrl(values.image.trim())) {
    errors.image = "Please upload an image or paste a link starting with http or https.";
  }
  if (!values.overview.trim()) errors.overview = "Please write an overview.";
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function StudioForm({ initial, owner, submitLabel, onSubmit }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_STUDIO,
    ...initial,
    hourlyRate: initial?.hourlyRate ?? "",
    securityDeposit: initial?.securityDeposit ?? "",
    maxCapacity: initial?.maxCapacity ?? "",
  }));
  const [errors, setErrors] = useState({});
  const [customAmenity, setCustomAmenity] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const amenityOptions = [
    ...new Set([...COMMON_AMENITIES, ...values.amenities]),
  ];
  const imageUrl = values.image.trim();

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function setAmenity(name, selected) {
    setValues((current) => ({
      ...current,
      amenities: selected
        ? [...new Set([...current.amenities, name])]
        : current.amenities.filter((item) => item !== name),
    }));
  }

  function addCustomAmenity() {
    const name = customAmenity.trim();
    if (!name) return;
    setAmenity(name, true);
    setCustomAmenity("");
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.url) {
        throw new Error(data?.message || "Image upload failed. Please try again.");
      }
      setValues((current) => ({ ...current, image: data.url }));
      setErrors((current) => ({ ...current, image: undefined }));
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        location: values.location.trim(),
        image: imageUrl,
        overview: values.overview.trim(),
        hourlyRate: Number(values.hourlyRate),
        securityDeposit: Number(values.securityDeposit),
        maxCapacity: Number(values.maxCapacity),
      });
    } catch (error) {
      toast.error(error.message);
      setSaving(false);
    }
  }

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: updateField,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field id="title" label="Title" error={errors.title}>
          <input
            {...inputProps("title")}
            type="text"
            placeholder="Daylight Cyc Wall Studio"
            className={`input w-full ${errors.title ? "input-error" : ""}`}
          />
        </Field>
      </div>

      <Field id="category" label="Category" error={errors.category}>
        <select
          {...inputProps("category")}
          className={`select w-full ${errors.category ? "select-error" : ""}`}
        >
          <option value="">Choose a category</option>
          {STUDIO_CATEGORIES.map(({ value }) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </Field>

      <Field id="location" label="Location / Address" error={errors.location}>
        <input
          {...inputProps("location")}
          type="text"
          placeholder="Gulshan 2, Dhaka"
          className={`input w-full ${errors.location ? "input-error" : ""}`}
        />
      </Field>

      <Field id="hourlyRate" label="Hourly Rate ($)" error={errors.hourlyRate}>
        <input
          {...inputProps("hourlyRate")}
          type="number"
          min="1"
          step="any"
          placeholder="45"
          className={`input w-full ${errors.hourlyRate ? "input-error" : ""}`}
        />
      </Field>

      <Field
        id="securityDeposit"
        label="Security Deposit ($)"
        error={errors.securityDeposit}
      >
        <input
          {...inputProps("securityDeposit")}
          type="number"
          min="0"
          step="any"
          placeholder="150"
          className={`input w-full ${errors.securityDeposit ? "input-error" : ""}`}
        />
      </Field>

      <Field id="maxCapacity" label="Max Capacity" error={errors.maxCapacity}>
        <input
          {...inputProps("maxCapacity")}
          type="number"
          min="1"
          step="1"
          placeholder="10"
          className={`input w-full ${errors.maxCapacity ? "input-error" : ""}`}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field id="image" label="Studio Image" error={errors.image}>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              {...inputProps("image")}
              type="url"
              placeholder="https://example.com/studio.jpg"
              className={`input min-w-0 flex-1 ${errors.image ? "input-error" : ""}`}
            />
            <label
              className={`btn btn-outline ${uploading ? "btn-disabled" : ""}`}
            >
              {uploading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Upload className="size-4" aria-hidden="true" />
              )}
              {uploading ? "Uploading" : "Upload Image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUpload}
                disabled={uploading}
                className="sr-only"
              />
            </label>
          </div>
        </Field>
        {isValidHttpUrl(imageUrl) && (
          <div className="relative mt-3 aspect-[16/9] max-w-sm overflow-hidden rounded-box bg-base-300">
            <Image
              src={imageUrl}
              alt="Studio preview"
              fill
              unoptimized
              sizes="384px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Amenities</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={values.amenities.includes(amenity)}
                onChange={(event) => setAmenity(amenity, event.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
        <div className="mt-3 flex max-w-sm gap-2">
          <label htmlFor="custom-amenity" className="sr-only">
            Add another amenity
          </label>
          <input
            id="custom-amenity"
            type="text"
            value={customAmenity}
            onChange={(event) => setCustomAmenity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomAmenity();
              }
            }}
            placeholder="Add another amenity"
            className="input min-w-0 flex-1"
          />
          <button type="button" onClick={addCustomAmenity} className="btn btn-outline">
            <Plus className="size-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <Field id="overview" label="Detailed Overview" error={errors.overview}>
          <textarea
            {...inputProps("overview")}
            rows={5}
            placeholder="Describe the space, the gear included and the kind of work it suits best."
            className={`textarea w-full ${errors.overview ? "textarea-error" : ""}`}
          />
        </Field>
      </div>

      <Field id="owner-name" label="Host Name">
        <input
          id="owner-name"
          type="text"
          value={owner.name}
          readOnly
          className="input w-full bg-base-200"
        />
      </Field>

      <Field id="owner-email" label="Host Email">
        <input
          id="owner-email"
          type="email"
          value={owner.email}
          readOnly
          className="input w-full bg-base-200"
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn btn-primary w-full sm:w-auto"
        >
          {saving && <span className="loading loading-spinner loading-sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
