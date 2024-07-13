'use client';
import { AdminCategoryColumns } from '@/@handles/category/admin-category-columns';
import { AdminCategoryUtils } from '@/@handles/category/admin-category.utils';
import { RouterPath } from '@/constants/router-path';
import { Button, Table } from '@/libraries/common';
import { Link } from '@/utils/navigation';

export default function CategoryPage() {
  const { items, loading, onDelete, loadingDelete, onSort, sortActives } = AdminCategoryUtils();

  return (
    <div className="mx-auto px-5">
      <Link href={RouterPath.CategoriesAdd}>
        <Button label="Create New Category" />
      </Link>
      <Table
        tableId="testTable"
        columns={AdminCategoryColumns({ onDelete, onSort, sortActives })}
        rows={items}
        loading={loading || loadingDelete}
        page={1}
        limit={10}
        total={100}
        onChangePage={(page) => console.log('Pagination====>', page)}
      />
    </div>
  );
}
