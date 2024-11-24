import { theme } from '../../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'white';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary',
  href,
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = theme.components.button[variant];
  const classes = `${baseClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
} 