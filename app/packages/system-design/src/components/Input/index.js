'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../utils");
function Input({ label, error, helperText, leftIcon, rightIcon, variant = 'default', size = 'md', fullWidth = false, required = false, type = 'text', className, ...props }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const inputVariants = {
        default: "border border-input bg-background",
        filled: "border-0 bg-muted/50 focus:bg-background",
        outlined: "border-2 border-input bg-transparent focus:border-primary"
    };
    const inputSizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-3 text-base",
        lg: "h-10 px-4 text-lg"
    };
    const containerClasses = (0, utils_1.cn)("flex flex-col gap-1", fullWidth && "w-full");
    const labelClasses = (0, utils_1.cn)("text-sm font-medium", error ? "text-destructive" : "text-foreground");
    const inputContainerClasses = (0, utils_1.cn)("relative flex items-center");
    const inputClasses = (0, utils_1.cn)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full min-w-0 rounded-md bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", inputVariants[variant], inputSizes[size], leftIcon && "pl-10", (rightIcon || isPassword) && "pr-10", error && "border-destructive focus-visible:ring-destructive/20", focused && "ring-2 ring-ring/50", className);
    return ((0, jsx_runtime_1.jsxs)("div", { className: containerClasses, children: [label && ((0, jsx_runtime_1.jsxs)("label", { className: labelClasses, children: [label, required && (0, jsx_runtime_1.jsx)("span", { className: "text-destructive ml-1", children: "*" })] })), (0, jsx_runtime_1.jsxs)("div", { className: inputContainerClasses, children: [leftIcon && ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-3 flex items-center text-muted-foreground", children: leftIcon })), (0, jsx_runtime_1.jsx)("input", { ...props, type: inputType, "data-slot": "input", className: inputClasses, onFocus: (e) => {
                            var _a;
                            setFocused(true);
                            (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
                        }, onBlur: (e) => {
                            var _a;
                            setFocused(false);
                            (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
                        } }), isPassword && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors", children: showPassword ? ((0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "h-4 w-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" })) })), rightIcon && !isPassword && ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-3 flex items-center text-muted-foreground", children: rightIcon }))] }), (error || helperText) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 text-xs", children: [error && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-3 w-3 text-destructive" }), (0, jsx_runtime_1.jsx)("span", { className: "text-destructive", children: error })] })), helperText && !error && ((0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: helperText }))] }))] }));
}
