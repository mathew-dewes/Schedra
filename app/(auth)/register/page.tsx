import { RegisterForm } from "./_components/RegisterForm";

export default function page(){
    return (
         <div className="flex mt-10 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
              <div className="w-full max-w-sm">
                <RegisterForm />
              </div>
            </div>
    )
}