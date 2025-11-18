// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import prettier from "eslint-plugin-prettier";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "**/dist/**",
      "**/dist/**/*",
      "**/packages/*/dist/**",
      "**/packages/**/dist/**",
      "app/packages/**/dist/**",
      "app/packages/**/dist/**/*",
      "**/packages/system-design/dist/**",
      "**/packages/system-design/dist/**/*",
      "**/packages/blog/dist/**",
      "**/packages/blog/dist/**/*",
      "next-env.d.ts",
      "**/*.stories.tsx",
      "**/*.stories.ts",
    ],
    rules: {
      "next/no-html-link-for-pages": "off", // Disable globally
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier,
    },
    rules: {
      // React Rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      
      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      // Import Rules
      "import/prefer-default-export": "off",
      "import/no-default-export": "off",
      "import/extensions": "off",
      
      // Next.js Rules
      "next/no-html-link-for-pages": "off", // Disable for packages
      "next/no-img-element": "off", // Allow img elements
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      
      // Prettier Rules
      "prettier/prettier": "error",
      
      // Accessibility Rules
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      
      // Custom Rules for UI Components
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["../components/*"],
              "message": "Use @ktbiotech/system-design components instead of local components"
            }
          ]
        }
      ],
      
      // Enforce component usage patterns
      "no-restricted-syntax": [
        "error",
        {
          "selector": "JSXElement[openingElement.name.name='h1']",
          "message": "Use <Heading level={1}> instead of <h1>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='h2']",
          "message": "Use <Heading level={2}> instead of <h2>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='h3']",
          "message": "Use <Heading level={3}> instead of <h3>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='h4']",
          "message": "Use <Heading level={4}> instead of <h4>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='h5']",
          "message": "Use <Heading level={5}> instead of <h5>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='h6']",
          "message": "Use <Heading level={6}> instead of <h6>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='p']",
          "message": "Use <Text> instead of <p>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='button']",
          "message": "Use <Button> instead of <button>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='input']",
          "message": "Use <Input> instead of <input>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='select']",
          "message": "Use <Select> instead of <select>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='table']",
          "message": "Use <Table> instead of <table>"
        },
        {
          "selector": "JSXElement[openingElement.name.name='form']",
          "message": "Use <Form> instead of <form>"
        }
      ]
    }
  },
  {
    files: ["**/*.stories.{js,jsx,ts,tsx}"],
    rules: {
      // Relaxed rules for Storybook files
      "no-console": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "storybook/no-renderer-packages": "off", // Allow @storybook/react import
      "react/no-unescaped-entities": "off", // Allow quotes in stories
      "@typescript-eslint/no-unused-vars": "off", // Allow unused vars in stories
    }
  },
  {
    files: ["**/packages/system-design/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Special rules for system-design package
      "no-restricted-syntax": "off", // Allow raw HTML in component definitions
      "@typescript-eslint/no-explicit-any": "off", // Allow any for component props
      "next/no-html-link-for-pages": "off", // Disable for packages
    }
  },
  {
    files: ["app/components/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Special rules for app components
      "no-restricted-syntax": "off", // Allow raw HTML in app components
    }
  },
  {
    files: ["**/*.js"],
    ignores: ["**/dist/**", "**/node_modules/**"],
    rules: {
      // Disable rules for compiled JavaScript files
      "@typescript-eslint/no-require-imports": "off",
      "no-var": "off",
      "object-shorthand": "off",
    }
  }
];

export default eslintConfig;
