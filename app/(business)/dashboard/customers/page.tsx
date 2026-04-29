
import { CustomerColumn } from "@/lib/types/tableColumns";
import { CustomerColumns } from "./_components/CustomerColumns";
import { CustomerTable } from "./_components/CustomerTable";


    async function getData(): Promise<CustomerColumn[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customer: "Bob"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
       customer: "Bob"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
       customer: "Bob"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
       customer: "Bob"
    },
    // ...
  ]
}

export default async function page(){

  const data = await getData()
    return (
       <div className="container mx-auto py-10">
      <CustomerTable columns={CustomerColumns} data={data} />
    </div>
    )
}