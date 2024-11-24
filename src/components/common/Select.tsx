import { theme } from '../../styles/theme';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className = '', ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`${theme.components.input.base} py-2 ${className}`}
    />
  );
} 