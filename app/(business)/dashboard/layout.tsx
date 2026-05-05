import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserMetaData } from "@/lib/supabase/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
const user = await getUserMetaData();

    return (
        <SidebarProvider>
            <AppSidebar businessName={user?.business_name} />
            <div className="w-full">
                <SidebarTrigger />
                <main className="mt-3">
                    {children}
                </main>
            </div>

        </SidebarProvider>
    )
}