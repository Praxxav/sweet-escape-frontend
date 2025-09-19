import { IconLogout } from "@tabler/icons-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser() {
  const handleLogout = () => {
    localStorage.removeItem("token") // clear token
    window.location.href = "/"       // redirect to home/login
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-2">
          <IconLogout className="size-5" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
