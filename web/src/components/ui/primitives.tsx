import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";

type FieldProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
};

function Field({ children, error, hint, label, required }: FieldProps & { children: ReactNode }) {
  return (
    <label className="ui-field">
      {label && <span className="ui-field-label">{label}{required && <span aria-hidden="true"> *</span>}</span>}
      {children}
      {error ? <span className="ui-field-error" role="alert">{error}</span> : hint && <span className="ui-field-hint">{hint}</span>}
    </label>
  );
}

export function Button({ className = "", variant = "primary", ...props }: ComponentProps<"button"> & { variant?: "primary" | "secondary" | "ghost" | "destructive" }) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props} />;
}

export function IconButton({ "aria-label": ariaLabel, className = "", ...props }: ComponentProps<"button">) {
  return <button aria-label={ariaLabel} className={`icon-button ${className}`.trim()} type="button" {...props} />;
}

export function Input({ error, hint, label, required, ...props }: ComponentProps<"input"> & FieldProps) {
  return <Field error={error} hint={hint} label={label} required={required}><input aria-invalid={Boolean(error) || undefined} className="ui-control" required={required} {...props} /></Field>;
}

export function Textarea({ error, hint, label, required, ...props }: ComponentProps<"textarea"> & FieldProps) {
  return <Field error={error} hint={hint} label={label} required={required}><textarea aria-invalid={Boolean(error) || undefined} className="ui-control ui-textarea" required={required} {...props} /></Field>;
}

export function Select({ children, error, hint, label, required, ...props }: ComponentProps<"select"> & FieldProps) {
  return <Field error={error} hint={hint} label={label} required={required}><select aria-invalid={Boolean(error) || undefined} className="ui-control" required={required} {...props}>{children}</select></Field>;
}

export function Checkbox({ children, ...props }: ComponentProps<"input"> & { children: ReactNode }) {
  return <label className="ui-checkbox"><input type="checkbox" {...props} /><span>{children}</span></label>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  return <span className={`ui-badge ui-badge-${tone}`}>{children}</span>;
}

export function Card({ children, className = "", variant = "elevated" }: { children: ReactNode; className?: string; variant?: "elevated" | "outlined" | "glass" }) {
  return <div className={`ui-card ui-card-${variant} ${className}`.trim()}>{children}</div>;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`shell ${className}`.trim()}>{children}</div>;
}

export function Section({ children, className = "", ...props }: ComponentProps<"section">) {
  return <section className={`ui-section ${className}`.trim()} {...props}>{children}</section>;
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`ui-divider ${className}`.trim()} />;
}

export function Avatar({ alt, fallback, src }: { alt: string; fallback: string; src?: string }) {
  return <span aria-label={alt} className="ui-avatar">{src ? <Image alt={alt} fill sizes="44px" src={src} /> : fallback}</span>;
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`ui-skeleton ${className}`.trim()} />;
}
