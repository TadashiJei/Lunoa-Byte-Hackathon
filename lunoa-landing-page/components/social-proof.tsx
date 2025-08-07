import Image from "next/image";

export function SocialProof() {
  return (
    <section className="self-stretch py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <div className="text-center text-gray-300 text-lg font-medium leading-tight">
        Trusted by Leading MSMEs and Service Providers
      </div>
      <div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {Array.from({ length: 8 }).map((_, i) => (
          <Image
            key={i}
            src={`/logos/logo0${i + 1}.svg`}
            alt={`Company Logo ${i + 1}`}
            width={200}
            height={200}
            className="w-full max-w-[140px] h-auto object-contain grayscale opacity-70"
          />
        ))}
      </div>
    </section>
  );
}
