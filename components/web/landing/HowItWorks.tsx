import HowToCard from "./cards/HowToCard";

export default function HowItWorks(){
    return (
        <section id="howItWorks" className="py-10">
            <h2 className="text-xl font-semibold text-center">How It Works?</h2>
        <div className="flex lg:flex-row flex-col items-center gap-5 justify-center mt-5">
            <HowToCard stepNumber="1" title="Account setup" content="Hello World"/>
            <HowToCard stepNumber="2" title="Add service centers and vehicles" content="Hello World"/>
            <HowToCard stepNumber="3" title="Add renewals and bookings" content="Hello World"/>
        </div>
        </section>
    )
}