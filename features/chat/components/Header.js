"use client";

import { NavigationMenu } from "radix-ui";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section className="flex justify-between items-center p-4 border-b border-border">
      <h1 className="font-bold text-2xl">sAIgely</h1>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Profile <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List">
                <li className="ListItemLink">Settings</li>
                <li className="ListItemLink">Logout</li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Theme <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List">
                <li>
                  <button
                    type="button"
                    className="ListItemLink w-full"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="ListItemLink w-full"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="ListItemLink w-full"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </button>
                </li>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className="ViewportPosition">
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>
    </section>
  );
};
