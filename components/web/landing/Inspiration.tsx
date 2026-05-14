import { inspiration } from "@/lib/content";

export default function Inspiration() {
    return (
        <section>
         <div className="max-w-3xl m-auto">
              <h2 className="font-semibold text-2xl text-center">Inspiration</h2>
              <p className="text-muted-foreground mt-3">{inspiration}</p>
            </div>

        </section>
    )
}