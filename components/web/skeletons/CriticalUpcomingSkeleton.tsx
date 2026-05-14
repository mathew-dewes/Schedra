import { SkeletonCard } from "./SkeletonCard";

export default function CriticalUpcomingSkeleton(){
    return (
              <div className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
        
                        <div className="space-y-5">
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
        
                    </div>
    )
}