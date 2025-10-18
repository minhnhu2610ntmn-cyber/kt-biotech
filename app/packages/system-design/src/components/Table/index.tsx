'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => string;
    onChange?: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string | number);
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  selectedRowKeys?: (string | number)[];
  onRowSelectionChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  emptyText?: string;
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
}

export const Table = <T extends Record<string, any>>({
  columns,
  dataSource,
  loading = false,
  pagination,
  rowKey = 'id',
  size = 'middle',
  bordered = false,
  striped = false,
  hoverable = true,
  selectable = false,
  selectedRowKeys = [],
  onRowSelectionChange,
  onRowClick,
  className = '',
  emptyText = 'No data',
  scroll,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);

  // Get row key value
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return dataSource;

    return [...dataSource].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      if (!column) return 0;

      const aValue = column.dataIndex ? a[column.dataIndex] : '';
      const bValue = column.dataIndex ? b[column.dataIndex] : '';

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [dataSource, sortConfig, columns]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Selection
  const allRowKeys = paginatedData.map((record, index) => getRowKey(record, index));
  const isAllSelected = allRowKeys.length > 0 && allRowKeys.every(key => selectedRowKeys.includes(key));
  const isIndeterminate = selectedRowKeys.some(key => allRowKeys.includes(key)) && !isAllSelected;

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    setSortConfig(prev => {
      if (prev?.key === column.key) {
        return prev.direction === 'asc' 
          ? { key: column.key, direction: 'desc' }
          : null;
      }
      return { key: column.key, direction: 'asc' };
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      const newSelectedKeys = selectedRowKeys.filter(key => !allRowKeys.includes(key));
      const newSelectedRows = dataSource.filter(record => 
        newSelectedKeys.includes(getRowKey(record, dataSource.indexOf(record)))
      );
      onRowSelectionChange?.(newSelectedKeys, newSelectedRows);
    } else {
      const newSelectedKeys = [...selectedRowKeys, ...allRowKeys];
      const newSelectedRows = [...dataSource.filter(record => 
        selectedRowKeys.includes(getRowKey(record, dataSource.indexOf(record)))
      ), ...paginatedData];
      onRowSelectionChange?.(newSelectedKeys, newSelectedRows);
    }
  };

  const handleSelectRow = (record: T, index: number) => {
    const key = getRowKey(record, index);
    const isSelected = selectedRowKeys.includes(key);
    
    let newSelectedKeys: (string | number)[];
    let newSelectedRows: T[];

    if (isSelected) {
      newSelectedKeys = selectedRowKeys.filter(k => k !== key);
      newSelectedRows = dataSource.filter(r => 
        newSelectedKeys.includes(getRowKey(r, dataSource.indexOf(r)))
      );
    } else {
      newSelectedKeys = [...selectedRowKeys, key];
      newSelectedRows = [...dataSource.filter(r => 
        selectedRowKeys.includes(getRowKey(r, dataSource.indexOf(r)))
      ), record];
    }

    onRowSelectionChange?.(newSelectedKeys, newSelectedRows);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination?.onChange?.(page, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    pagination?.onChange?.(1, newPageSize);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getCellClasses = () => {
    const baseClasses = 'px-4 py-2';
    const sizeClasses = getSizeClasses();
    return `${baseClasses} ${sizeClasses}`;
  };

  const renderCell = (column: TableColumn<T>, record: T, index: number) => {
    const value = column.dataIndex ? record[column.dataIndex] : '';
    
    if (column.render) {
      return column.render(value, record, index);
    }

    if (column.ellipsis) {
      return (
        <div className="truncate max-w-xs" title={String(value)}>
          {String(value)}
        </div>
      );
    }

    return String(value);
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const total = pagination.total || dataSource.length;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, total);

    return (
      <div className="flex items-center justify-between mt-4 px-4 py-2 bg-gray-50 border-t">
        <div className="flex items-center space-x-4">
          {pagination.showTotal && (
            <span className="text-sm text-gray-700">
              {pagination.showTotal(total, [startItem, endItem])}
            </span>
          )}
          
          {pagination.showSizeChanger && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <div 
        className={`overflow-auto ${bordered ? 'border border-gray-300 rounded-lg' : ''}`}
        style={scroll ? { maxHeight: scroll.y, maxWidth: scroll.x } : {}}
      >
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className={`${getCellClasses()} text-left border-b border-gray-200`}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${getCellClasses()} border-b border-gray-200 ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  } ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`w-3 h-3 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        />
                        <ChevronDownIcon 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={`${getCellClasses()} text-center text-gray-500`}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => {
                const key = getRowKey(record, index);
                const isSelected = selectedRowKeys.includes(key);
                
                return (
                  <tr
                    key={key}
                    className={`
                      ${striped && index % 2 === 1 ? 'bg-gray-50' : ''}
                      ${hoverable ? 'hover:bg-gray-100' : ''}
                      ${isSelected ? 'bg-blue-50' : ''}
                      ${onRowClick ? 'cursor-pointer' : ''}
                      transition-colors duration-150
                    `}
                    onClick={() => onRowClick?.(record, index)}
                  >
                    {selectable && (
                      <td className={`${getCellClasses()} border-b border-gray-200`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(record, index)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${getCellClasses()} border-b border-gray-200 ${
                          column.align === 'center' ? 'text-center' : 
                          column.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {renderCell(column, record, index)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};
