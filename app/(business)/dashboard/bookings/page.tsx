import { BookingColumns, Payment } from "./_components/Bookingcolumn";
import { BookingTable } from "./_components/BookingTable";


    async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function page(){

  const data = await getData()
    return (
       <div className="container mx-auto py-10">
      <BookingTable columns={BookingColumns} data={data} />
    </div>
    )
}