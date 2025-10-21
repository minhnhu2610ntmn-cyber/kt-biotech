import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './index';

const meta: Meta<typeof Timeline> = {
  title: 'components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    showConnector: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const sampleTimelineItems = [
  {
    id: 1,
    title: 'Tiêu đề mốc thời gian',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '01/01/2025',
  },
  {
    id: 2,
    title: 'Tiêu đề mốc thời gian',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '01/01/2025',
  },
  {
    id: 3,
    title: 'Tiêu đề mốc thời gian',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '01/01/2025',
  },
  {
    id: 4,
    title: 'Tiêu đề mốc thời gian',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: '01/01/2025',
  },
];

export const Default: Story = {
  args: {
    items: sampleTimelineItems,
    orientation: 'vertical',
    showConnector: true,
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleTimelineItems.slice(0, 3), // Show only 3 items for horizontal
    orientation: 'horizontal',
    showConnector: true,
  },
};

export const CustomConnectorColor: Story = {
  args: {
    items: sampleTimelineItems,
    orientation: 'vertical',
    showConnector: true,
  },
};

export const NoConnector: Story = {
  args: {
    items: sampleTimelineItems,
    orientation: 'vertical',
    showConnector: false,
  },
};

export const CompanyMilestones: Story = {
  args: {
    items: [
      {
        id: 1,
        description: 'Molecular Biology Laboratory research group established',
        date: '1997',
      },
      {
        id: 2,
        description: 'KTBioTech officially incorporated',
        date: '2004',
      },
      {
        id: 3,
        description: 'Successfully developed infectious disease diagnostic kit',
        date: '2006',
      },
      {
        id: 4,
        description: 'Entered Southeast Asian biotechnology markets',
        date: '2010',
      },
      {
        id: 5,
        description: 'Developing advanced molecular diagnostic solutions',
        date: '2024',
      },
    ],
    orientation: 'vertical',
    showConnector: true,
  },
};
