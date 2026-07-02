import { Dialog } from "radix-ui";
import { useTheme } from "next-themes";

export const SettingsDialog = ({ open, onOpenChange }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />

        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Settings</Dialog.Title>

          <Dialog.Description className="DialogDescription">
            Customize your Saigely experience.
          </Dialog.Description>

          <div className="DialogSection">
            <div className="DialogField">
              <label className="DialogLabel" htmlFor="theme">
                Theme
              </label>

              <select
                id="theme"
                className="DialogSelect"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* AI Model */}

            <div className="DialogField">
              <label className="DialogLabel" htmlFor="model">
                AI Model
              </label>

              <select id="model" className="DialogSelect">
                {/* Populate from GraphQL */}
              </select>
            </div>

            {/* Temperature */}

            <div className="DialogField">
              <label className="DialogLabel" htmlFor="temperature">
                Temperature
              </label>

              <input
                id="temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                className="DialogSlider"
              />
            </div>
          </div>

          <div className="DialogFooter">
            <Dialog.Close asChild>
              <button className="ListItemLink">Close</button>
            </Dialog.Close>

            <button className="ListItemLink">Save</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
