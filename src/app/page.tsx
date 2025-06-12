import Image from "next/image";
import SignUpModal from "@/components/SignUpModal";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-[Montserrat]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Content Container */}
      <div className="relative z-10 h-full px-8 sm:px-12 lg:px-16">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Flowweave"
              width={100}
              height={100}
              className="rounded"
            />
            <span className="text-2xl font-bold tracking-wide">Flowweave</span>
          </div>
          <div className="flex items-center gap-3">
            <SignUpModal>
              <button 
                className="group flex items-center rounded-full bg-white px-8 py-2.5 text-sm font-medium text-[#1E0044] transition-all hover:bg-white/90"
              >
                SIGN UP
                <Image 
                  src="/Arrow.svg" 
                  alt="→" 
                  width={12} 
                  height={12} 
                  className="ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-45" 
                />
              </button>
            </SignUpModal>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="mt-40 max-w-4xl">
          <h1 className="text-[5.5rem] font-light leading-[1.2] tracking-[-0.02em]">
            Create{" "}
            <span className="inline-block bg-gradient-to-r italic from-[#B341FF] to-[#D83DFF] bg-clip-text pb-2 text-transparent">
              permanent
            </span>
            <br />
            workflows{" "}
            <a
              href="https://app_flowweave.ar.io"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center rounded-full bg-white hover:rotate-45 transition-all duration-300 ease-in-out px-4 py-2"
            >
              <Image
                src="/Arrow.svg"
                alt="→"
                width={44}
                height={44}
                className="translate-y-[-1px] m-2"
              />
            </a>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed tracking-wide text-gray-400">
            A no-code automation platform for building composable workflows using
            decentralized AO processes.
          </p>
        </div>
      </div>
    </div>
  );
}
