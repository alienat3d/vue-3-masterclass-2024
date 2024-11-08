<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <!-- 1.1 If look to DataTable component we can see that it’s using this FlexRender component in order to render our a value. And this component takes whatever we pass into h-func in the cell prop and then it renders as HTML. And we’ll comment this out. -->
            <!-- <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" /> -->
            <!-- 1.2 We want to just display the cell value without using this component. If we look at the [src\pages\projects\index.vue] h-func for "cell" prop we’ll see that we’re using "getValue()" method on the "row" to get any value we want from the "row". If we check the documentation we’ll find out we can have this also on the cell. If we use getValue() on the cell we’ll get the value of the cell. If we check now the browser — we get the data alright, but we lost all the paddings. And it makes sense because now we don’t have any elements inside of our DataTable element. And CSS rules are only applies to the elements inside the table data. But that’s fine, no matter for now. -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <!-- 1.4 If we comment out the method on the cell and add a slot inside. And this "slot" will be our way to pass things from parent component to this specific area inside of child component. -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <!-- {{ cell.getValue() }} -->
            <!-- 1.6 But we actually only need to make first column items clickable and the rest columns let just getValue to get the value and render it. That’s where "slot name" be useful. We can provide a name for the slot. -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <!-- 1.8 But we also have to give a unique name as a name column, so that we can easily target it from the parent. We'll bind the name prop of the slot, use string literals, add - after cell and set value which we get from "cell.column.id", which is name of the column. So only slots under the column "Name" will have the name "cell-name". We’ll also have columns with the names 'cell-status' & "cell-collaborators". -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <!-- 1.10 Now let’s add the default value to other columns as we wanted to. Anything we’ll pass before the tags "slot" will be used as the value -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <!-- 1.12 ... All this info we can only get in the child component inside of the cell object we get from the "v-for" loop. So how do we pass this "cell" object from the child to the parent in order to use it inside the RouterLink and make it customizable? For that we use something called "scoped slots". We’ll provide another prop and call it "cell" and the value of it will be "cell" we getting from the loop the "cell" object. And now this object will be available from the parent. -->
            <!-- Go to [src\pages\projects\index.vue] -->
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <slot :name="`cell-${cell.column.id}`" :cell="cell">
                {{ cell.getValue() }}
              </slot>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
<!-- 
<style scoped>
td {
  @apply p-0;
}

td > * {
  @apply p-4;
}
</style> -->
