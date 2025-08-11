/**
 * Page layout component
 * Provides consistent page structure
 */

import { cn } from '@/lib/utils';
import layoutStyles from '@/styles/layouts/page.module.css';
import { type BaseComponentProps } from '@/types';

interface PageLayoutProps extends BaseComponentProps {
  centered?: boolean;
}

export function PageLayout({
  children,
  className,
  centered = false,
}: PageLayoutProps): React.JSX.Element {
  return (
    <div className={cn(layoutStyles.pageGrid, className)}>
      <main
        className={centered ? layoutStyles.mainCentered : layoutStyles.main}
      >
        {children}
      </main>
    </div>
  );
}

interface PageFooterProps extends BaseComponentProps {}

export function PageFooter({
  children,
  className,
}: PageFooterProps): React.JSX.Element {
  return (
    <footer className={cn(layoutStyles.footer, className)}>{children}</footer>
  );
}
