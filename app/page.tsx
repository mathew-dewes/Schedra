
import Features from "@/components/web/landing/Features";
import Hero from "@/components/web/landing/Hero";
import HowItWorks from "@/components/web/landing/HowItWorks";
import Inspiration from "@/components/web/landing/Inspiration";


export default  function page(){


  return (
    <div className="space-y-15 mb-40">
      <Hero/>
      <Inspiration/>
      <Features/>
      <HowItWorks/>
  
    </div>
  )
}