// Yapılandırılmış veri. Yalnızca gerçek ve doğrulanabilir bilgiler kullanılır.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
