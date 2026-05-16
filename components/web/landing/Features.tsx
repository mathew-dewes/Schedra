
import { features } from "@/lib/content";
import FeatureCard from "./cards/FeatureCard";

export default function Features(){
    return (
        <section id="features">
            <h2 className="font-bold text-xl mt-5 text-center">Features</h2>
        <div className="flex gap-5 flex-wrap justify-center text-center mt-5">
          <FeatureCard title="Renewal Tracking" description={features.renewal_tracking} />
          <FeatureCard title="Vehicle and vendor Register" description={features.vehicle_and_vendor_register}/>
          <FeatureCard title="Secure authentification" description={features.secure_auth}/>
        </div>
        </section>

        
    )
}