import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { GearIcon, ExitIcon, PersonIcon } from "@radix-ui/react-icons";

export function UserMenu({ onOpenSettings, onLogout }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sidebar-hover transition-colors"
          aria-label="User menu"
        >
          {/* Avatar/Icon */}
          <PersonIcon size={18} className="DropdownMenuItemIcon" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent"
          align="end"
          sideOffset={8}
        >
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={onOpenSettings}
          >
            <GearIcon size={18} className="DropdownMenuItemIcon" />
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparator" />

          <DropdownMenu.Item className="DropdownMenuItem" onSelect={onLogout}>
            <ExitIcon size={18} className="DropdownMenuItemIcon" />
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
