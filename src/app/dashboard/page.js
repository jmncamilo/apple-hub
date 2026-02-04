import Image from "next/image";

export default function DashboardHome() {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full border border-gray-100">
          <div className="flex flex-col items-center space-y-10">
            <div className="flex-shrink-0">
              <Image
                width={310}
                height={310}
                src="/applehub-logo.png"
                alt="Logo de la aplicación"
                className="rounded-lg"
                priority
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-9">
                Desarrollado por:
              </h2>
              <div className="space-y-3">
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-700">Camilo Jiménez</p>
                </div>
                <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-700">jmncamilo@gmail.com</p>
                </div>
                  <div className="group px-4 py-3 bg-[#5d4ee7] rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <a
                          href="https://github.com/jmncamilo/apple-hub"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-white group-hover:text-[#5d4ee7] transition-colors block"
                      >
                          Repositorio
                      </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}