"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieValue = void 0;
exports.cn = cn;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
/**
 * Utility function to merge class names
 */
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
/**
 * Get cookie value by name
 */
const getCookieValue = (name) => {
    var _a;
    if (typeof document === 'undefined')
        return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return ((_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift()) || null;
    return null;
};
exports.getCookieValue = getCookieValue;
