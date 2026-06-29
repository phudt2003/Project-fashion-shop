export function Button({ className = '', type = 'button', variant = 'primary', ...props }) {
  const baseClasses = 'inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-extrabold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]';
  
  const variantClasses = {
    primary: 'bg-primary text-on-primary shadow-button hover:-translate-y-0.5 hover:bg-secondary hover:text-[var(--badge-sale-text)]',
    secondary: 'border border-border-subtle bg-white text-on-surface shadow-soft hover:-translate-y-0.5 hover:border-primary hover:bg-primary-soft hover:text-primary',
    accent: 'bg-accent text-[var(--badge-hot-text)] shadow-button hover:-translate-y-0.5 hover:bg-secondary',
    ghost: 'bg-transparent text-on-surface hover:bg-surface-container-low hover:text-primary',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    />
  );
}
