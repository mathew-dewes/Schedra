
import FeatureCard from "./cards/FeatureCard";

export default function Features(){
    return (
        <section className="py-10" id="features">
            <h2 className="font-bold text-xl mt-5 text-center">Features</h2>
        <p className="text-sm text-muted-foreground text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, reprehenderit.</p>
        <div className="flex gap-5 mt-5">
          <FeatureCard/>
          <FeatureCard/>
          <FeatureCard/>
        </div>
        </section>
    )
}