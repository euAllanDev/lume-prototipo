type DatabaseEnvironment = Partial<
  Pick<
    NodeJS.ProcessEnv,
    "DATABASE_URL" | "DATABASE_URL_UNPOOLED"
  >
>;

export class DatabaseConfigurationError extends Error {
  constructor(variableName: keyof DatabaseEnvironment) {
    super(`Missing or invalid required database environment variable: ${variableName}`);
    this.name = "DatabaseConfigurationError";
  }
}

function requiredPostgresUrl(
  environment: DatabaseEnvironment,
  variableName: keyof DatabaseEnvironment,
): string {
  const value = environment[variableName];

  if (!value) {
    throw new DatabaseConfigurationError(variableName);
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
      throw new DatabaseConfigurationError(variableName);
    }
  } catch {
    throw new DatabaseConfigurationError(variableName);
  }

  return value;
}

export function getApplicationDatabaseUrl(
  environment: DatabaseEnvironment = process.env as DatabaseEnvironment,
): string {
  return requiredPostgresUrl(environment, "DATABASE_URL");
}

export function getMigrationDatabaseUrl(
  environment: DatabaseEnvironment = process.env as DatabaseEnvironment,
): string {
  return requiredPostgresUrl(environment, "DATABASE_URL_UNPOOLED");
}
