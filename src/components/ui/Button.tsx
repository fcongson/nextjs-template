/**
 * Reusable Button component
 */

import Link from 'next/link';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import buttonStyles from '@/styles/components/buttons.module.css';
import { type ButtonProps } from '@/types';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      onClick,
      href,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClassName = cn(
      buttonStyles.button,
      buttonStyles[variant],
      className
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <Link
          href={href}
          className={baseClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...props}
        >
          {loading && <span>Loading...</span>}
          {children}
        </Link>
      );
    }

    // Otherwise render as button
    return (
      <button
        className={baseClassName}
        disabled={disabled || loading}
        onClick={onClick}
        type={type}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {loading && <span>Loading...</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
