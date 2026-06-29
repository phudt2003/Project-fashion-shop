export function TextInput({ label, error, id, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">{label}</span>}
      <input
        id={id}
        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-base outline-none focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        {...props}
      />
      {error && <span className="mt-1 block text-sm text-[var(--color-error)]">{error}</span>}
    </label>
  );
}

