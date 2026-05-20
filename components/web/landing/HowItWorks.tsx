import { howItWorks } from "@/lib/content";
import HowToCard from "./cards/HowToCard";

export default function HowItWorks() {
    return (
        <section id="howItWorks" className="py-10">
            <h2 className="text-xl font-semibold text-center">How It Works?</h2>
            <div className="flex gap-5 flex-wrap justify-center text-center mt-5">
                <HowToCard stepNumber="1" title="Account setup" content={howItWorks.step1} />
                <HowToCard stepNumber="2" title="Add service centers and vehicles" content={howItWorks.step2} />
                <HowToCard stepNumber="3" title="Add renewals and bookings" content={howItWorks.step3} />
            </div>


        </section>
    )
}