import React, { useState } from 'react'

const Faq = () => {
  const [open, setOpen] = useState(null)

  const faqs = [
    { q: "What documents do I need to rent a car?", 
      a: "You need a valid driver's license, ID proof, and a credit card for the security deposit."
    },
    { q: "What is the minimum age to rent a car?", 
      a: "The minimum age requirement is 21 years old with a valid driver's license." 
    },
    { q: "Can I cancel my booking?", 
      a: "Yes, you can cancel up to 24 hours before pickup for a full refund." 
    },
    { q: "Is insurance included?", a: "Basic insurance is included. Additional coverage options are available at checkout." }
  ]

  return (
    <div className="px-8 py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4 border-b pb-4">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex justify-between items-center font-semibold text-lg">
              {faq.q}
              <span className="text-2xl">{open === i ? '-' : '+'}</span>
            </button>
            {open === i && <p className="mt-3 text-gray-600">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq
