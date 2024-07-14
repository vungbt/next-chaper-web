'use client';
import { AdminCategoryColumns } from '@/@handles/category/admin-category-columns';
import { AdminCategoryUtils } from '@/@handles/category/admin-category.utils';
import { RouterPath } from '@/constants/router-path';
import { Button, FunctionBar, Table } from '@/libraries/common';
import { Link } from '@/utils/navigation';

export default function CategoryPage() {
  const {
    items,
    loading,
    onDelete,
    pagination,
    setPagination,
    loadingDelete,
    metadata,
    onSort,
    sortActives,
    setSearchValue
  } = AdminCategoryUtils();

  return (
    <div>
      <FunctionBar
        addUrl={RouterPath.CategoriesAdd}
        onSearch={setSearchValue}
        // pagination top
        pagination={{
          total: metadata?.count ?? 0,
          limit: pagination.limit as number,
          currentPage: pagination.page
        }}
        onChangePage={(page) => setPagination({ ...pagination, page })}
      />
      <Table
        tableId="testTable"
        columns={AdminCategoryColumns({ onDelete, onSort, sortActives })}
        rows={items}
        loading={loading || loadingDelete}
        total={metadata?.count ?? 0}
        limit={pagination.limit as number}
        page={pagination.page}
        onChangePage={(page) => setPagination({ ...pagination, page })}
      />
    </div>
  );
}
