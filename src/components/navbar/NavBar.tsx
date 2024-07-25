import { useContext, useEffect, useState } from "react";
import {
  Button,
  makeStyles,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuButton,
  MenuList,
  MenuItem,
  tokens,
} from "@fluentui/react-components";
import {
  GridDots24Filled,
  Alert24Regular,
  Settings24Regular,
  TextAlignJustify20Regular,
} from "@fluentui/react-icons";
import { Toolbar, ToolbarButton, ToolbarGroup } from "@fluentui/react-components";

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: tokens.colorBrandForeground1,
    height: "100%",
    justifyContent: "space-between",
    display: "flex",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    width: "100%",
  },
  booton: {
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "16px",
    paddingRight: "20px",
  },
});

export const NavBar = ({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}) => {
  const style = useStyles();

  const [shouldRenderContent, setShouldRenderContent] = useState(true);


  useEffect(() => {
    if (!sidebarOpen) {
      const timeoutId = setTimeout(() => {
        setShouldRenderContent(false);
      }, 700);

      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setShouldRenderContent(true);
      }, 600);
      return () => clearTimeout(timeoutId);
    }
  }, [sidebarOpen]);


  return (
    <Toolbar aria-label="with Separeted Groups" className={style.toolbar}>
      <div
        style={{
          display: "flex",
          width: sidebarOpen ? "14.5%" : "3.3%",
          alignItems: "center",
          overflow: "hidden",
          transition: "width 0.5s",
          justifyContent: sidebarOpen ? "space-between" : "center",
        }}
      >
        <div>
          <ToolbarGroup role="presentation">
            <div style={{ display: "flex", justifyItems: "start", alignItems: "center" }}>
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button appearance="primary" icon={<GridDots24Filled />} />
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>
                      <>
                        <div style={{width:"14rem", height:"20rem"}}></div>
                      </>
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>

              <span
                style={{
                  marginLeft: "5px",
                  color: "#fff",
                  fontWeight: "bold",
                  visibility: sidebarOpen ? "visible" : "hidden",
                  opacity: sidebarOpen ? "1" : "0",
                  transition: "opacity 0.6s linear, visibility 0.6s linear",
                  display: shouldRenderContent ? "block" : "none",
                  width: "100%",
                }}
              >
                Reto MS4M
              </span>
            </div>
          </ToolbarGroup>
        </div>

        <div
          style={{
            visibility: sidebarOpen ? "visible" : "hidden",
            opacity: sidebarOpen ? "1" : "0",
            transition: "opacity 0.6s linear, visibility 0.6s linear",
            display: shouldRenderContent ? "block" : "none",
          }}
        >
          <Button
            appearance="transparent"
            icon={<TextAlignJustify20Regular style={{ color: "#eee" }} />}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: sidebarOpen ? "85.5%" : "96.7%",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "0.5rem",
          transition: "all 0.6s linear",
        }}
      >
        <ToolbarGroup role="presentation">
          <Menu>
            <MenuTrigger disableButtonEnhancement>
             <div></div>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
              
              </MenuList>
            </MenuPopover>
          </Menu>
        </ToolbarGroup>

        <ToolbarGroup role="presentation">
          <ToolbarButton
            aria-label="Decrease Font Size"
            appearance="primary"
            vertical
            icon={<Settings24Regular />}
          />
          <ToolbarButton
            aria-label="Increase Font Size"
            appearance="primary"
            icon={<Alert24Regular />}
          />
          <ToolbarButton
            aria-label="Increase Font Size"
            appearance="primary"
            icon={
              <>
       
              </>
            }
          />
        </ToolbarGroup>
      </div>
    </Toolbar>
  );
};
