import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="py-10">

            <div className="flex justify-center">
                <Badge>Now in Early Access</Badge>
            </div>


            <h1 className="font-bold text-center text-3xl mt-5">Schedra</h1>
            <div className="mt-5 text-center">
                <p className="font-semibold text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, molestias.</p>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quidem distinctio doloremque nam rerum architecto.</p>

            </div>

            <div className="flex justify-center gap-2 mt-5">
                <Button>Create Business</Button>
                <Button>Login</Button>
            </div>

        </section>
    )
}