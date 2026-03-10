"use client";

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function decodeData<T>(obj: T): T {
	if (typeof obj === "string") {
		try {
			return decodeURIComponent(obj.replace(/\+/g, "%20")) as unknown as T;
		} catch (e) {
			return obj;
		}
	}
	if (Array.isArray(obj)) {
		return obj.map(decodeData) as unknown as T;
	}
	if (obj !== null && typeof obj === "object") {
		const decodedObj: Record<string, unknown> = {};
		for (const key in obj) {
			decodedObj[key] = decodeData((obj as unknown as Record<string, unknown>)[key]);
		}
		return decodedObj as T;
	}
	return obj;
}
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	/*const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );*/ // ถ้าอยากใช้ filter แยกคอลัมน์ก็เปิดใช้งาน state นี้ แล้วใส่ props ที่เกี่ยวข้องใน useReactTable
	const [globalFilter, setGlobalFilter] = useQueryState("search", {
		defaultValue: "",
	});

	const processedData = useMemo(() => {
		return data.map((item) => decodeData(item));
	}, [data]);

	const table = useReactTable({
		data: processedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			globalFilter,
		},
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

					<Input placeholder="ค้นหาชื่อ, อีเมล, เบอร์โทร..." value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} className="pl-9" />
				</div>
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, i) => {
									return <TableHead key={i}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell, i) => (
										<TableCell key={i}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between py-4">
				<div className="text-sm text-muted-foreground">
					หน้า {table.getState().pagination.pageIndex + 1} จาก {table.getPageCount()}
				</div>

				<div className="flex items-center space-x-2">
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						ก่อนหน้า
					</Button>
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						ถัดไป
					</Button>
				</div>
			</div>
		</div>
	);
}
