"use client";
import { ReactNode } from "react";

// Define size options as a type
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string; // Made optional
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Added event parameter
  size?: ButtonSize; // Added size prop
  variant?: "primary" | "secondary" | "outline" | "ghost"; // Added variant options
  fullWidth?: boolean; // Added fullWidth option
  disabled?: boolean; // Added disabled state
  type?: "button" | "submit" | "reset"; // Added button type option
}

export const Button = ({ 
  children, 
  className = "", 
  appName,
  onClick,
  size = "md",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  type = "button"
}: ButtonProps) => {
  // Size classes based on the size prop
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
    xl: "text-xl px-6 py-3"
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50"
  };

  // Base classes that apply to all buttons
  const baseClasses = "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-app-name={appName} // Using data attribute for app name
    >
      {children}
    </button>
  );
};