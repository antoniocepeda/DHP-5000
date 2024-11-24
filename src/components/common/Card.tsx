import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const classes = `
    ${theme.components.card.base}
    ${hover ? theme.components.card.hover : ''}
    ${className}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  return (
    <div onClick={onClick} className={classes}>
      {children}
    </div>
  );
} 