"use client";
import { NotionRenderer as NotionRendererLib } from "react-notion-x";
import { useTheme } from "next-themes";

export const BlogRender = ({ recordMap }: { recordMap: any }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  /*cl
  // TODO: add custom components
  const components = useMemo(
    () => ({
      
    }),
    []
  );
  */

  return (
    <NotionRendererLib
      bodyClassName="text-base sm:text-lg"
      className={"dark:!bg-[#1a1919]"}
      darkMode={!isDarkMode}
      disableHeader
      fullPage
      recordMap={recordMap}
    />
  );
};
