import * as React from "react";
interface InputProps extends Omit<React.ComponentProps<"input">, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    required?: boolean;
}
declare function Input({ label, error, helperText, leftIcon, rightIcon, variant, size, fullWidth, required, type, className, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export { Input };
