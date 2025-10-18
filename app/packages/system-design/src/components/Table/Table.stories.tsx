import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableColumn } from './index';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onRowSelectionChange: { action: 'row selection changed' },
    onRowClick: { action: 'row clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 32,
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 45,
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    age: 29,
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    age: 35,
    role: 'Developer',
    status: 'active',
    lastLogin: '2024-01-15',
  },
];

const basicColumns: TableColumn<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    align: 'center',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    align: 'center',
  },
];

const columnsWithActions: TableColumn<User>[] = [
  ...basicColumns,
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <button className='text-blue-600 hover:text-blue-800 text-sm'>
          Edit
        </button>
        <button className='text-red-600 hover:text-red-800 text-sm'>
          Delete
        </button>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
  },
};

export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
    pagination: {
      current: 1,
      pageSize: 3,
      total: sampleUsers.length,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
  },
};

export const WithSelection: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
    selectable: true,
    selectedRowKeys: [1, 3],
  },
};

export const WithActions: Story = {
  args: {
    columns: columnsWithActions,
    dataSource: sampleUsers,
    hoverable: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
    bordered: true,
    striped: true,
  },
};

export const SmallSize: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    columns: basicColumns,
    dataSource: sampleUsers,
    size: 'large',
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    dataSource: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    dataSource: [],
    emptyText: 'No users found',
  },
};

export const Scrollable: Story = {
  args: {
    columns: [
      ...basicColumns,
      {
        key: 'description',
        title: 'Description',
        dataIndex: 'description',
        width: 200,
        render: () =>
          'This is a long description that might cause horizontal scrolling',
      },
    ],
    dataSource: sampleUsers.map(user => ({
      ...user,
      description:
        'This is a long description that might cause horizontal scrolling',
    })),
    scroll: { x: 800, y: 300 },
  },
};

export const ComplexData: Story = {
  args: {
    columns: [
      {
        key: 'avatar',
        title: 'Avatar',
        align: 'center',
        width: 80,
        render: (_, record) => (
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            {record.name.charAt(0)}
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        sortable: true,
        render: (value, record) => (
          <div>
            <div className='font-medium'>{value}</div>
            <div className='text-sm text-gray-500'>{record.email}</div>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
        sortable: true,
        render: value => (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
            {value}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        align: 'center',
        render: value => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              value === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1 ${
                value === 'active' ? 'bg-green-400' : 'bg-red-400'
              }`}
            ></span>
            {value}
          </span>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        align: 'center',
        render: (_, record) => (
          <div className='flex space-x-1'>
            <button className='p-1 text-gray-400 hover:text-blue-600'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                <path
                  fillRule='evenodd'
                  d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            <button className='p-1 text-gray-400 hover:text-green-600'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
              </svg>
            </button>
            <button className='p-1 text-gray-400 hover:text-red-600'>
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'
                  clipRule='evenodd'
                />
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    dataSource: sampleUsers,
    bordered: true,
    striped: true,
    hoverable: true,
  },
};
