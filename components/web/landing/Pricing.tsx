import PricingCard from "./cards/PricingCard";

export default function Pricing(){
    return (
        <section id="pricing" className="py-5">
            <h2 className="text-xl font-bold text-center">Pricing</h2>
               <div className="flex gap-5 mt-5">
                      <PricingCard/>
                      <PricingCard/>
            
                    </div>
        </section>
    )
}