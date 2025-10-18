import type { Meta, StoryObj } from '@storybook/react';
import { 
  Typography, 
  Heading, 
  Text, 
  Link, 
  Code, 
  Blockquote, 
  List, 
  ListItem 
} from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'muted', 'white'],
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    transform: {
      control: { type: 'select' },
      options: ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
    },
    decoration: {
      control: { type: 'select' },
      options: ['underline', 'line-through', 'no-underline'],
    },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'This is default typography text',
    color: 'primary',
    weight: 'normal',
    align: 'left',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography color="primary">Primary text color</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="success">Success text color</Typography>
      <Typography color="warning">Warning text color</Typography>
      <Typography color="error">Error text color</Typography>
      <Typography color="info">Info text color</Typography>
      <Typography color="muted">Muted text color</Typography>
      <Typography color="white" className="bg-gray-800 p-2 rounded">
        White text color
      </Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="light">Light weight text</Typography>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
      <Typography weight="extrabold">Extrabold weight text</Typography>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography align="left" className="border p-2">
        Left aligned text
      </Typography>
      <Typography align="center" className="border p-2">
        Center aligned text
      </Typography>
      <Typography align="right" className="border p-2">
        Right aligned text
      </Typography>
      <Typography align="justify" className="border p-2">
        Justified text that spreads across the full width of the container. This text will be justified to fill the entire width.
      </Typography>
    </div>
  ),
};

export const Transforms: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography transform="normal-case">Normal case text</Typography>
      <Typography transform="uppercase">Uppercase text</Typography>
      <Typography transform="lowercase">Lowercase text</Typography>
      <Typography transform="capitalize">capitalize text</Typography>
    </div>
  ),
};

export const Decorations: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography decoration="no-underline">No underline text</Typography>
      <Typography decoration="underline">Underlined text</Typography>
      <Typography decoration="line-through">Line through text</Typography>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2X large text (2xl)</Text>
      <Text size="3xl">3X large text (3xl)</Text>
      <Text size="4xl">4X large text (4xl)</Text>
      <Text size="5xl">5X large text (5xl)</Text>
      <Text size="6xl">6X large text (6xl)</Text>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body">Body text variant</Text>
      <Text variant="caption">Caption text variant</Text>
      <Text variant="overline">Overline text variant</Text>
      <Text variant="subtitle">Subtitle text variant</Text>
    </div>
  ),
};

export const Links: Story = {
  render: () => (
    <div className="space-y-4">
      <Link href="#" underline>Internal link with underline</Link>
      <Link href="#" underline={false}>Internal link without underline</Link>
      <Link href="https://example.com" external>External link with icon</Link>
      <Link href="#" color="success">Success colored link</Link>
      <Link href="#" color="error">Error colored link</Link>
    </div>
  ),
};

export const CodeExample: Story = {
  render: () => (
    <div className="space-y-4">
      <p>
        Use <Code>console.log()</Code> to debug your JavaScript code.
      </p>
      <p>
        The <Code>useState</Code> hook is used for managing state in React components.
      </p>
      <div className="bg-gray-900 p-4 rounded">
        <Code color="white" className="bg-transparent text-green-400">
          npm install react-hook-form
        </Code>
      </div>
    </div>
  ),
};

export const Blockquotes: Story = {
  render: () => (
    <div className="space-y-4">
      <Blockquote>
        "The best way to predict the future is to create it."
      </Blockquote>
      <Blockquote color="info">
        "Innovation distinguishes between a leader and a follower."
      </Blockquote>
      <Blockquote color="success">
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
      </Blockquote>
    </div>
  ),
};

export const Lists: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading level={4}>Unordered List</Heading>
        <List>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
        </List>
      </div>
      
      <div>
        <Heading level={4}>Ordered List</Heading>
        <List ordered>
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
          <ListItem>Third step</ListItem>
        </List>
      </div>
      
      <div>
        <Heading level={4}>Custom Styled List</Heading>
        <List className="list-none space-y-2">
          <ListItem className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Custom styled item
          </ListItem>
          <ListItem className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Another custom item
          </ListItem>
        </List>
      </div>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Heading level={5}>Single Line Truncation</Heading>
        <Typography truncate>
          This is a very long text that will be truncated with ellipsis when it exceeds the container width.
        </Typography>
      </div>
      
      <div>
        <Heading level={5}>Multi-line Truncation</Heading>
        <Typography lineClamp={2}>
          This is a very long text that will be truncated after two lines. It demonstrates how the line-clamp utility works to limit the number of lines displayed while showing an ellipsis at the end.
        </Typography>
      </div>
      
      <div>
        <Heading level={5}>Three Line Truncation</Heading>
        <Typography lineClamp={3}>
          This is a very long text that will be truncated after three lines. It demonstrates how the line-clamp utility works to limit the number of lines displayed while showing an ellipsis at the end. This allows for better control over text overflow in constrained spaces.
        </Typography>
      </div>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-6">
      <Heading level={1} className="text-2xl md:text-4xl lg:text-6xl">
        Responsive Heading
      </Heading>
      
      <Text size="sm" className="md:text-base lg:text-lg">
        This text scales responsively across different screen sizes.
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <Heading level={4}>Card Title</Heading>
          <Text variant="caption">Mobile: 1 column</Text>
        </div>
        <div className="p-4 border rounded">
          <Heading level={4}>Card Title</Heading>
          <Text variant="caption">Tablet: 2 columns</Text>
        </div>
        <div className="p-4 border rounded">
          <Heading level={4}>Card Title</Heading>
          <Text variant="caption">Desktop: 3 columns</Text>
        </div>
      </div>
    </div>
  ),
};

export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={1} className="mb-2">Typography Scale</Heading>
        <Text variant="subtitle" color="secondary">
          A comprehensive typography system for consistent text styling
        </Text>
      </div>
      
      <div className="space-y-6">
        <div>
          <Heading level={2}>Headings</Heading>
          <div className="space-y-2">
            <Heading level={1}>H1 - Main Page Title</Heading>
            <Heading level={2}>H2 - Section Title</Heading>
            <Heading level={3}>H3 - Subsection Title</Heading>
            <Heading level={4}>H4 - Component Title</Heading>
            <Heading level={5}>H5 - Small Title</Heading>
            <Heading level={6}>H6 - Smallest Title</Heading>
          </div>
        </div>
        
        <div>
          <Heading level={2}>Body Text</Heading>
          <div className="space-y-2">
            <Text size="lg">Large body text for important content</Text>
            <Text size="base">Regular body text for general content</Text>
            <Text size="sm">Small body text for secondary content</Text>
            <Text size="xs">Extra small text for captions and labels</Text>
          </div>
        </div>
        
        <div>
          <Heading level={2}>Special Text</Heading>
          <div className="space-y-2">
            <Text variant="subtitle">Subtitle text</Text>
            <Text variant="caption">Caption text</Text>
            <Text variant="overline">Overline text</Text>
            <Code>Inline code text</Code>
          </div>
        </div>
      </div>
    </div>
  ),
};
