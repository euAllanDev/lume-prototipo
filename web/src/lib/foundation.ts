import type { FoundationCapability } from "@/types/foundation";

export const foundationCapabilities: readonly FoundationCapability[] = [
  {
    title: "App Router e componentes de servidor",
    description:
      "Páginas e layouts começam no servidor; interatividade futura entra apenas onde for necessária.",
    status: "Configurado",
  },
  {
    title: "TypeScript estrito e lint",
    description:
      "Tipos, aliases e verificações separados reduzem regressões antes de qualquer domínio ser migrado.",
    status: "Configurado",
  },
  {
    title: "Identidade visual Lume",
    description:
      "Cores, profundidade, textura, vidro e comportamento responsivo transitam para a nova base.",
    status: "Preservado",
  },
] as const;
