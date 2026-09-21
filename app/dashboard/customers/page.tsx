import Link from "next/link";
import { getAllCustomers } from "@/lib/dashboard/customers";
import { Table, Thead, Th, Tr, Td } from "@/components/ui/Table";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatDateShort } from "@/lib/utils/format";

export default async function DashboardCustomersPage() {
  const customers = await getAllCustomers();

  return (
    <div>
      <h2 className="mb-1.5 text-xl font-bold text-navy-deep">العملاء</h2>
      <p className="mb-6 text-sm text-text-muted">{customers.length} عميل مسجّل من خلال الحجوزات.</p>

      {customers.length === 0 ? (
        <div className="rounded-2xl border border-navy/8 bg-white p-10 text-center text-sm text-text-muted">
          لا يوجد عملاء بعد.
        </div>
      ) : (
        <Table>
          <Thead>
            <tr>
              <Th>اسم العميل</Th>
              <Th>رقم الهاتف</Th>
              <Th>المنطقة</Th>
              <Th>عدد الحجوزات</Th>
              <Th>آخر حجز</Th>
              <Th>تواصل</Th>
            </tr>
          </Thead>
          <tbody>
            {customers.map((customer) => (
              <Tr key={customer.id}>
                <Td>
                  <Link
                    href={`/dashboard/customers/${customer.id}`}
                    className="font-medium text-navy-deep hover:text-gold"
                  >
                    {customer.name}
                  </Link>
                </Td>
                <Td dir="ltr" className="text-right">
                  {customer.phone}
                </Td>
                <Td>{customer.area}</Td>
                <Td>{customer.bookingCount}</Td>
                <Td className="whitespace-nowrap">
                  {customer.lastBookingDate ? formatDateShort(customer.lastBookingDate) : "—"}
                </Td>
                <Td>
                  <WhatsAppButton phone={customer.phone} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
