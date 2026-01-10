export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            backgroundColor: "#FDF5E6",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "500px",
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "0.75rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1.25rem",
                lineHeight: 1,
              }}
            >
              🔍
            </div>

            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1e3a5f",
                margin: "0 0 0.75rem 0",
              }}
            >
              Error 404 - Page Not Found
            </h1>

            <p
              style={{
                fontSize: "1rem",
                color: "#4b5563",
                margin: "0 0 1.5rem 0",
                lineHeight: 1.6,
              }}
            >
              We couldn&apos;t find the page that you wanted!
            </p>

            <a
              href="/en"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                borderRadius: "9999px",
                textDecoration: "none",
                backgroundColor: "#1e3a5f",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
