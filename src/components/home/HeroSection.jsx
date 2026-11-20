"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Check, Flame, Pizza, Sparkles } from "lucide-react";

// Images live in /public/images. Later, swap this array for real menu items from your API.
const flavors = [
  {
    id: "truffle",
    name: "Truffle Pepperoni Supreme",
    description:
      "San Marzano crushed tomatoes, aged fior di latte mozzarella, crispy beef pepperoni, roasted wild mushrooms, and cold-pressed basil oil.",
    price: 1250,
    sauce: "100% Italian Tomatoes",
    dough: "Handmade Sourdough",
    cheese: "Fresh Mozzarella",
    image: "/images/hero-pizza.jpg",
  },
  {
    id: "cheese-feast",
    name: "Cheese Feast",
    description:
      "A rich blend of mozzarella, cheddar and parmesan over a perfectly baked, blistered wood-fired crust.",
    price: 980,
    sauce: "Slow-cooked Pomodoro",
    dough: "48-hr Fermented Dough",
    cheese: "Triple Cheese Blend",
    image: "/images/pizza-2.jpg",
  },
  {
    id: "special",
    name: "Chef's Special Pizza",
    description:
      "Our house special with roasted toppings, fresh herbs and a finishing drizzle of extra virgin olive oil.",
    price: 1100,
    sauce: "Roasted Tomato Base",
    dough: "Whole-grain Crust",
    cheese: "Aged Provolone",
    image: "/images/pizza-3.jpg",
  },
];

const avatars = [
  { letter: "A", color: "bg-indigo-500" },
  { letter: "R", color: "bg-amber-600" },
  { letter: "S", color: "bg-rose-600" },
];

function FloatingLabel({ title, text, floatClass = "animate-float-slow", delay = "0s", className = "" }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute z-30 rounded-2xl border border-tomato/20 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xl transition-transform duration-300 hover:scale-105 ${floatClass} ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-ember">
        {title}
      </p>
      <p className="mt-0.5 text-[13px] font-semibold text-ink">{text}</p>
    </div>
  );
}

/**
 * onAddToCart: (flavor) => void — আপনার cart context-এর addToCart এখানে পাঠান।
 * উদাহরণ: <HeroSection onAddToCart={addToCart} />
 */
export default function HeroSection({ onAddToCart }) {
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const [addCount, setAddCount] = useState(0);
  const timer = useRef(null);
  const flavor = flavors[active];

  // unmount হলে timeout পরিষ্কার
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    onAddToCart?.(flavor); // cart state আপডেট হলে Navbar-এর ব্যাজও বদলাবে
    setAdded(true);
    setAddCount((c) => c + 1);
    clearTimeout(timer.current); // আগের timeout বাতিল, তাই আর জমবে না
    timer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    // "never" = OS-এ animation বন্ধ থাকলেও চলবে। Production-এ accessibility চাইলে "user" করুন।
    <MotionConfig reducedMotion="never">
      <section className="mx-auto max-w-[1216px] overflow-x-clip px-5 pb-20 pt-10 md:pt-12">
        {/* Badge + heading */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#e9e6dc] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink sm:text-[12px]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tomato opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-tomato" />
            </span>
            Handcrafted in Dhaka • 48-hr fermented dough
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display relative z-20 mx-auto -mb-[clamp(1.5rem,4.2vw,3.6rem)] mt-3 text-[clamp(3.2rem,11.5vw,9.8rem)] leading-[0.88] text-ink"
          >
            <span className="text-tomato">Wood-fired</span> Pizza
            <br />
            Collection
          </motion.h1>
        </div>

        {/* Feature card */}
        <div className="relative rounded-[44px] border border-line bg-cream-deep px-6 pb-10 pt-[clamp(3.5rem,7.5vw,6.5rem)] shadow-[0_30px_60px_-40px_rgba(28,25,21,0.35)] sm:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr_auto]">
            {/* Left: copy */}
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ember shadow-sm">
                <Flame size={13} fill="currentColor" />
                Chef&apos;s signature #1
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={flavor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-display mt-5 text-[clamp(2.2rem,4vw,3.1rem)] leading-[0.95] text-ink">
                    {flavor.name}
                  </h2>
                  <p className="mt-5 max-w-sm text-[17px] leading-7 text-ink-soft">
                    {flavor.description}
                  </p>

                  <div className="mt-7">
                    <p className="text-[12px] font-bold uppercase tracking-wide text-ink-soft">
                      12&quot; Artisan Large
                    </p>
                    <p className="font-display text-[44px] leading-none text-tomato">
                      ৳{flavor.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6">
                <Link href="/menu" className="btn-dark focus-ring">
                  Order Slice / Whole
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {avatars.map((a) => (
                    <span
                      key={a.letter}
                      className={`grid h-9 w-9 place-items-center rounded-full border-2 border-cream-deep text-[11px] font-bold text-white ${a.color}`}
                    >
                      {a.letter}
                    </span>
                  ))}
                </div>
                <p className="text-[13px] text-ink-soft">
                  <b className="text-ink">2,400+ pizza lovers</b> ordered this week
                </p>
              </div>
            </div>

            {/* Center: pizza */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative aspect-square w-full max-w-[400px]">
                {/* Rising steam / sparkle accent */}
                <div className="animate-steam-rise pointer-events-none absolute -top-6 left-1/2 z-20 flex -translate-x-1/2 gap-5">
                  <Sparkles className="h-5 w-5 text-ember/70" />
                  <Sparkles className="h-4 w-4 text-tomato/60" />
                </div>

                <FloatingLabel
                  title="Sauce"
                  text={flavor.sauce}
                  floatClass="animate-float-slow"
                  delay="0s"
                  className="left-0 top-2 sm:-left-8"
                />
                <FloatingLabel
                  title="Dough"
                  text={flavor.dough}
                  floatClass="animate-float-reverse"
                  delay="0.4s"
                  className="bottom-4 left-0 sm:-left-12"
                />
                <FloatingLabel
                  title="Cheese"
                  text={flavor.cheese}
                  floatClass="animate-float-slow"
                  delay="0.8s"
                  className="bottom-2 right-0 sm:-right-8"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={flavor.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.92, rotate: 10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-4"
                  >
                    <div className="animate-float-slow relative h-full w-full overflow-hidden rounded-full border-[7px] border-white shadow-[0_30px_60px_-20px_rgba(28,25,21,0.45)]">
                      <Image
                        src={flavor.image}
                        alt={flavor.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 80vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: add to cart + flavors */}
            <div className="order-3 flex items-center justify-center gap-6 lg:flex-col lg:gap-8">
              <motion.button
                type="button"
                onClick={handleAdd}
                whileHover={{ scale: 1.07 }} // rotate সরানো হয়েছে, তাই টেক্সট আর কাত হবে না
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                aria-label="Add to cart"
                className="focus-ring relative grid h-[124px] w-[124px] shrink-0 place-items-center rounded-full bg-tomato text-center text-white shadow-[0_18px_36px_-8px_rgba(200,31,31,0.6)] ring-[6px] ring-tomato/15 transition-colors hover:bg-tomato-dark"
              >
                {/* Ripple: প্রতি ক্লিকে নতুন করে চলে, বাটনের ওপরেও দেখা যায় */}
                {addCount > 0 && (
                  <motion.span
                    key={addCount}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-tomato/40"
                  />
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? "added" : "idle"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="relative flex flex-col items-center"
                  >
                    {added ? (
                      <motion.span
                        key={addCount} // প্রতিবার ক্লিকে চেক আইকন পপ করবে
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 12 }}
                      >
                        <Check size={26} strokeWidth={3} />
                      </motion.span>
                    ) : (
                      <Pizza size={26} />
                    )}
                    <span className="font-display mt-1 text-[17px] leading-none">
                      {added ? "Added!" : "Add to cart"}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold opacity-90">
                      {added ? "In your cart" : "+ Quick Add"}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <div className="rounded-3xl bg-white p-3 shadow-md">
                <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Switch flavor
                </p>
                <div className="flex gap-3 lg:flex-col">
                  {flavors.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${f.name}`}
                      aria-pressed={i === active}
                      className={`focus-ring relative h-14 w-14 overflow-hidden rounded-2xl transition ${
                        i === active
                          ? "ring-[3px] ring-tomato ring-offset-2 ring-offset-white"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image src={f.image} alt="" fill sizes="56px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}