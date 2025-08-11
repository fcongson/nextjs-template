/**
 * Common TypeScript types and interfaces
 */

// ============================================
// React Component Types
// ============================================
export interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// ============================================
// Layout Types
// ============================================
export interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}

// ============================================
// Button Types
// ============================================
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

// ============================================
// Navigation Types
// ============================================
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

// ============================================
// API Types
// ============================================
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// ============================================
// Utility Types
// ============================================
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
