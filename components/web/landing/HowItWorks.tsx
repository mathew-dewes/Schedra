import HowToCard from "./cards/HowToCard";

export default function HowItWorks(){
    return (
        <section id="howItWorks" className="py-10">
            <h2 className="text-xl font-semibold text-center">How It Works?</h2>
        <div className="grid lg:grid-cols-3 gap-5 mt-5 justify-center">
            <HowToCard/>
            <HowToCard/>
            <HowToCard/>
        </div>
        </section>
    )
}