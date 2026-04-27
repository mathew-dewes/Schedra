import { redirect } from "next/navigation";



export default async function page() {

    const published_business = true;

    if (!published_business) redirect('/on-boarding')

    return (
        <div>
          <p>Dashboard</p>
  
        </div>
    )
}