import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * Utility function to merge class names
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/**
 * Get cookie value by name
 */
export const getCookieValue = (name) => {
    var _a;
    if (typeof document === 'undefined')
        return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return ((_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift()) || null;
    return null;
};
