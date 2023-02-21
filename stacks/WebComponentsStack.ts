import { StackContext, StaticSite } from "sst/constructs"

export function WebComponents({ stack }: StackContext) {
  const components = new StaticSite(stack, "react", {
    path: "packages/web-components",
    buildOutput: "dist",
    buildCommand: "npm run build"
  })

  return {components}
}
