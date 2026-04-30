import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <SidebarTrigger />
                <main className="mt-3">
                    {children}
                </main>
            </div>

        </SidebarProvider>
    )
}