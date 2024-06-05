import mainTheme from "@/styles/MainTheme";
import "styled-components";

type MainTheme = typeof mainTheme;

declare module "styled-components" {
  export interface DefaultTheme extends MainTheme {}
}
