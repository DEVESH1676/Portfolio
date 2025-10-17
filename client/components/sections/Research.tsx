import { RESEARCH_TAGS } from "@/data/portfolio";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export const ResearchSection = () => {
  return (
    <motion.section
      id="research"
      className="bg-background py-24 scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      custom={0}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Research Interests
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              My research focuses on computer vision and video analytics —
              object detection and tracking across frames, query-based video
              retrieval, hybrid machine learning models, and practical
              deployment of intelligent vision systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {RESEARCH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
