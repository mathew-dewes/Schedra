import Login from "./_components/Login";

type Props = {
  searchParams: Promise<{[key: string]: string}>
  
}


export default async function page({searchParams}:Props) {

  const showDemo = (await searchParams).demo;

  
  return (
   <Login demo={showDemo == "true"}/>
  )
}
