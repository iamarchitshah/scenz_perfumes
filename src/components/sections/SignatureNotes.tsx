"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const notes = [
  {
    id: "top",
    title: "Top Notes",
    subtitle: "The First Impression",
    ingredients: "Bergamot, Saffron, Pink Pepper",
    description: "The initial sparkle that captivates the senses.",
    color: "#F4C430",
  },
  {
    id: "heart",
    title: "Heart Notes",
    subtitle: "The Core Identity",
    ingredients: "Bulgarian Rose, Jasmine, Oud",
    description: "The rich, unfolding character that defines the fragrance.",
    color: "#D4AF37",
  },
  {
    id: "base",
    title: "Base Notes",
    subtitle: "The Lasting Memory",
    ingredients: "Amber, Sandalwood, Vanilla, Musk",
    description: "The deep, lingering foundation that stays with you.",
    color: "#AA8C2C",
  },
];

export default function SignatureNotes() {
  const [activeNote, setActiveNote] = useState(notes[0].id);

  return (
    <section className="py-24 bg-background border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading heading-gold mb-4"
          >
            Signature Composition
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground uppercase tracking-widest text-sm"
          >
            The Anatomy of a Masterpiece
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onMouseEnter={() => setActiveNote(note.id)}
              className={`p-8 border transition-all duration-500 cursor-pointer ${
                activeNote === note.id ? "bg-white/5 border-gold glass-card" : "bg-transparent border-white/10 hover:border-gold/50"
              }`}
            >
              <div className="mb-6 flex justify-between items-center">
                <span className="text-[10px] tracking-widest uppercase text-gold font-bold">0{index + 1}</span>
                <motion.div 
                  className="w-8 h-px"
                  animate={{
                    backgroundColor: activeNote === note.id ? note.color : "#333",
                    width: activeNote === note.id ? "3rem" : "1rem"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <h3 className="text-2xl font-heading mb-2 text-foreground">{note.title}</h3>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-6">{note.subtitle}</h4>
              
              <motion.div
                animate={{
                  opacity: activeNote === note.id ? 1 : 0.5,
                  height: activeNote === note.id ? "auto" : "60px",
                }}
                className="overflow-hidden"
              >
                <div className="text-gold text-sm tracking-wide font-medium mb-3">{note.ingredients}</div>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{note.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
