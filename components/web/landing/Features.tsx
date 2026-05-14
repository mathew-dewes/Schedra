
import FeatureCard from "./cards/FeatureCard";

export default function Features(){
    return (
        <section id="features">
            <h2 className="font-bold text-xl mt-5 text-center">Features</h2>
        <p className="text-sm text-muted-foreground text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, reprehenderit.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-5 justify-center">
          <FeatureCard title="Feature 1" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
          <FeatureCard title="Feature 2" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
          <FeatureCard title="Feature 3" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, saepe!" content="Lorem ipsum dolor sit amet."/>
        </div>
        </section>

        
    )
}