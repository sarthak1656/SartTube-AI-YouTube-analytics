import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookType,
  Calendar,
  ChartNoAxesColumn,
  GalleryThumbnails,
  Gauge,
  Home,
  ImageIcon,
  Inbox,
  Lightbulb,
  Search,
  Settings,
  Video,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Thumbnail Generator",
    url: "#",
    icon: ImageIcon,
  },
  {
    title: "Thumbnail Search",
    url: "#",
    icon: GalleryThumbnails,
  },
  {
    title: "Keywords",
    url: "#",
    icon: BookType,
  },
  {
    title: "Optimize",
    url: "#",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Outlier",
    url: "#",
    icon: Gauge,
  },
  {
    title: "AI Content Generator",
    url: "#",
    icon: Lightbulb,
  },
  {
    title: "Billing",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <Video className="w-16 h-16" style={{ color: "#ef3b23" }} />
            <h1 className="text-4xl font-bold text-center">
              <span className="text-black">SAR</span>
              <span style={{ color: "#ef3b23" }}>TUBE</span>
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item, index) => (
                // <SidebarMenuItem key={item.title} className='p-2'>
                //     <SidebarMenuButton asChild className=''>
                <a
                  href={item.url}
                  key={index}
                  className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${
                                   path.includes(item.url) && "bg-gray-200ß"
                                 }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
                //     </SidebarMenuButton>
                // </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h2 className="p-2 text-gray-400 text-sm">Copyright @SarTube</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
