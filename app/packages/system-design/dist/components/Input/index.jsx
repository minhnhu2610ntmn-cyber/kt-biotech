'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "../../utils";
function Input(_a) {
    var { label, error, helperText, leftIcon, rightIcon, variant = 'default', size = 'md', fullWidth = false, required = false, type = 'text', className } = _a, props = __rest(_a, ["label", "error", "helperText", "leftIcon", "rightIcon", "variant", "size", "fullWidth", "required", "type", "className"]);
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
    const containerClasses = cn("flex flex-col gap-1", fullWidth && "w-full");
    const labelClasses = cn("text-sm font-medium", error ? "text-destructive" : "text-foreground");
    const inputContainerClasses = cn("relative flex items-center");
    const inputClasses = cn("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full min-w-0 rounded-md bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", inputVariants[variant], inputSizes[size], leftIcon && "pl-10", (rightIcon || isPassword) && "pr-10", error && "border-destructive focus-visible:ring-destructive/20", focused && "ring-2 ring-ring/50", className);
    return (<div className={containerClasses}>
      {label && (<label className={labelClasses}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>)}
      
      <div className={inputContainerClasses}>
        {leftIcon && (<div className="absolute left-3 flex items-center text-muted-foreground">
            {leftIcon}
          </div>)}
        
        <input {...props} type={inputType} data-slot="input" className={inputClasses} onFocus={(e) => {
            var _a;
            setFocused(true);
            (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }} onBlur={(e) => {
            var _a;
            setFocused(false);
            (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }}/>
        
        {isPassword && (<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors">
            {showPassword ? (<EyeOff className="h-4 w-4"/>) : (<Eye className="h-4 w-4"/>)}
          </button>)}
        
        {rightIcon && !isPassword && (<div className="absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>)}
      </div>
      
      {(error || helperText) && (<div className="flex items-center gap-1 text-xs">
          {error && (<>
              <AlertCircle className="h-3 w-3 text-destructive"/>
              <span className="text-destructive">{error}</span>
            </>)}
          {helperText && !error && (<span className="text-muted-foreground">{helperText}</span>)}
        </div>)}
    </div>);
}
export { Input };
