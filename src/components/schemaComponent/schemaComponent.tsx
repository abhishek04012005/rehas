// This component renders JSON-LD structured data
// Usage: <SchemaComponent schema={organizationSchema} />

interface SchemaComponentProps {
  schema: Record<string, any>;
}

export default function SchemaComponent({ schema }: SchemaComponentProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
