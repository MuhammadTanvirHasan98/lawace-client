export default function GuidanceProcess() {
  return (
    <section className="py-16 mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#002139] mb-4">
            How Does The Legal Consultation Work?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures you get the legal assistance you
            need in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {/* Step 1 */}
          <div className="group">
            <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-[#C08D5D] font-semibold mb-4">Step 1</div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Schedule Consultation
              </h3>
              <p className="text-gray-300">
                Book your free 30-minute initial consultation. Choose a
                convenient time slot, and we'll confirm your appointment within
                24 hours.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group">
            <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-[#C08D5D] font-semibold mb-4">Step 2</div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Case Evaluation
              </h3>
              <p className="text-gray-300">
                Meet with our experienced attorney who will review your case,
                discuss legal options, and provide initial guidance on the best
                path forward.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group">
            <div className="bg-[#002139] rounded-xl p-8 h-full transform transition-transform duration-300 hover:-translate-y-2">
              <div className="text-[#C08D5D] font-semibold mb-4">Step 3</div>
              <h3 className="text-white text-2xl font-bold mb-4">
                Legal Strategy
              </h3>
              <p className="text-gray-300">
                Receive a detailed action plan outlining your legal strategy,
                timeline, and cost structure for moving forward with your case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
