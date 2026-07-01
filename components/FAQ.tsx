interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  questions: FAQItem[]
}

export default function FAQ({ questions }: FAQProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {questions.map((q, i) => (
          <details
            key={i}
            className="group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer select-none font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
              <span>{q.question}</span>
              <svg
                className="faq-chevron shrink-0 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 pt-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {q.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
