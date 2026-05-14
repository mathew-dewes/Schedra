
import FeatureCard from "./cards/FeatureCard";

export default function Features(){
    return (
        <section id="features">
            <h2 className="font-bold text-xl mt-5 text-center">Features</h2>
        <div className="flex lg:flex-row flex-col items-center gap-5 justify-center mt-5">
          <FeatureCard title="Renewal Tracking" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
          <FeatureCard title="Vehicle and vendor Register" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
          <FeatureCard title="Secure authentification" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
        </div>
        </section>

        
    )
}