import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb";
import { Separator } from "@/components/ui/shadcn/separator";
import { SidebarTrigger } from "@/components/ui/shadcn/sidebar";

export default function Page() {
  return (
    <>
      <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Total Users</span>
            </div>
            <div className="mt-2 text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <div className="mt-2 text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">Active Projects</span>
            </div>
            <div className="mt-2 text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </div>
          <div className="bg-card text-card-foreground rounded-lg border p-6">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Pending Tasks</span>
            </div>
            <div className="mt-2 text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">-5 from yesterday</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="bg-card text-card-foreground col-span-4 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Activity {index + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      This is a sample activity description
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {index + 1}h ago
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card text-card-foreground col-span-3 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                Create New Project
              </button>
              <button className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
                Add User
              </button>
              <button className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
