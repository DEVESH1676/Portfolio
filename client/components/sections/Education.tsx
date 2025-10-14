import { EDUCATION_TIMELINE } from "@/data/portfolio";
import Timeline, { TimelineItem } from "@/components/Timeline";
import { motion } from "framer-motion";

// Fade-in-up variant reused from Timeline/Hero
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const EducationSection = () => {
  return (
    <motion.section
      id="education"
      className="bg-secondary/40 py-24 scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      custom={0}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div custom={0} variants={fadeInUp}>
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Education
            </h2>
            <p className="mt-4 max-w-2xl text-base text-foreground/75 md:text-lg">
              A progressive academic journey grounded in Computer Engineering,
              culminating in a doctoral degree focused on advancing intelligent
              video analytics.
            </p>
          </div>
        </motion.div>

        <Timeline items={EDUCATION_TIMELINE as TimelineItem[]} />
      </div>
    </motion.section>
  );
};