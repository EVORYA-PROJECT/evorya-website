"use client";

import Link from "next/link";
import MobileExperience from "@/components/ui/MobileExperience";
import MobileRail from "@/components/ui/MobileRail";
import { MotionConfig, motion } from "motion/react";
import { useTemplateSelection } from "@/lib/templates/selection-context";
import Fade, { PhotoReveal } from "./Fade";
import Nav from "./Nav";
import Soins from "./Soins";
import { Photo } from "./visuals";
import {
  EQUIPE,
  GALERIE,
  HORAIRES,
  INSTITUT,
  PHOTOS,
  PHOTO_CREDIT,
  REPERES,
  RITUEL,
} from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      data-reveal
      aria-hidden="true"
      className={`block h-px origin-left bg-current ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 1, ease: EASE }}
    />
  );
}

export default function BeauteDemo({ displayClass }: { displayClass: string }) {
  const { select } = useTemplateSelection();
  const eyebrow = "text-[0.68rem] font-medium uppercase tracking-[0.3em]";
  const title = `${displayClass} text-[2.5rem] leading-[0.98] tracking-[-0.02em] sm:text-[3.8rem] lg:text-[5.4rem]`;

  return (
    <MotionConfig reducedMotion="user">
      <Nav displayClass={displayClass} />

      <main data-mobile-page="beaute" id="top" className="overflow-clip bg-[#F4F0E9] text-[#2A211D]">
        <MobileExperience />
        <section className="relative isolate min-h-[calc(100svh-8rem)] overflow-hidden bg-[#2B302A] text-[#F7F1E8] lg:min-h-[calc(100svh-10rem)]">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[61%]">
            <Photo
              asset={PHOTOS.visage}
              priority
              veil={false}
              objectPosition="center 48%"
              sizes="(min-width: 1024px) 61vw, 100vw"
              className="absolute inset-0 h-full w-full"
            />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,48,42,1)_0%,rgba(43,48,42,.88)_18%,rgba(43,48,42,.18)_66%,rgba(43,48,42,.28)_100%)] lg:bg-[linear-gradient(90deg,rgba(43,48,42,1)_0%,rgba(43,48,42,.8)_16%,rgba(43,48,42,.06)_58%)]" />
            <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(43,48,42,.82),transparent_55%)] lg:hidden" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1440px] flex-col justify-between px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[calc(100svh-10rem)] lg:px-12 lg:py-16">
            <Fade y={12}>
              <div className="flex items-center gap-4 text-[#DDD1C1]">
                <span className={eyebrow}>Maison de soins</span>
                <span className="h-px w-14 bg-[#BFA78E]" />
                <span className={eyebrow}>Casablanca</span>
              </div>
            </Fade>

            <div className="max-w-[58rem] pb-5 pt-32 sm:pt-44 lg:pb-0 lg:pt-32">
              <Fade delay={0.12} y={24} duration={1.4}>
                <p className={`${eyebrow} mb-5 text-[#DDD1C1]`}>Beauté · soin · précision</p>
                <h1 className={`${displayClass} text-[4.3rem] leading-[0.78] tracking-[-0.055em] sm:text-[7rem] lg:text-[9.6rem] xl:text-[11rem]`}>
                  Institut
                  <span className="block pl-[0.32em] text-[#D7B99B]">Soline</span>
                </h1>
              </Fade>

              <Fade delay={0.28} y={16}>
                <div className="mt-9 grid max-w-3xl gap-7 border-t border-[#F7F1E8]/25 pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p className="max-w-xl text-[1rem] leading-[1.8] text-[#EEE4D8] sm:text-[1.08rem]">
                    {INSTITUT.baseline} Des protocoles précis, des matières marocaines
                    et le temps nécessaire pour laisser le geste agir.
                  </p>
                  <a
                    href="#soins"
                    className="group flex w-fit items-center gap-4 text-[0.72rem] uppercase tracking-[0.24em] text-[#F7F1E8]"
                  >
                    Explorer les soins
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#F7F1E8]/45 transition-transform duration-500 group-hover:translate-x-1">
                      ↓
                    </span>
                  </a>
                </div>
              </Fade>
            </div>

            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[#DDD1C1]">
              Gauthier · Sur rendez-vous · Mardi — Dimanche
            </p>
          </div>
        </section>

        <section className="border-b border-[#806D5E]/20 bg-[#D8C2AA] px-5 py-7 sm:px-8 lg:px-12">
          <ul className="mx-auto grid max-w-[1440px] gap-5 md:grid-cols-3 md:gap-10">
            {REPERES.map((item, index) => (
              <li key={item.titre} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-[#2A211D]/25 pt-4 md:border-t-0 md:pt-0">
                <span className={`${displayClass} text-sm`}>0{index + 1}</span>
                <div>
                  <p className={`${displayClass} text-xl leading-none`}>{item.titre}</p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-[#56463C]">{item.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="institut" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
              <div className="lg:col-span-5 lg:pt-16">
                <Fade y={14}>
                  <p className={`${eyebrow} text-[#766052]`}>01 · La maison</p>
                  <h2 className={`${title} mt-7`}>
                    Le calme n&rsquo;est pas un décor.
                    <span className="block text-[#8A6C58]">C&rsquo;est le protocole.</span>
                  </h2>
                </Fade>
                <Fade delay={0.12} y={14}>
                  <div className="mt-10 max-w-md space-y-5 text-[0.98rem] leading-[1.9] text-[#66564C]">
                    <p>{INSTITUT.intro}</p>
                    <p>
                      Chaque rendez-vous commence par une lecture de peau et se termine
                      par un temps de repos. Entre les deux : peu de produits, beaucoup de
                      main, aucune vente pendant le soin.
                    </p>
                  </div>
                </Fade>
              </div>

              <PhotoReveal className="lg:col-span-5 lg:col-start-7 lg:row-start-1">
                <Photo
                  asset={PHOTOS.arcades}
                  parallax={5}
                  objectPosition="center 48%"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="aspect-[4/5] w-full"
                />
              </PhotoReveal>

              <PhotoReveal className="relative -mt-24 ml-auto w-[66%] sm:-mt-40 sm:w-[48%] lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-0 lg:w-full lg:self-end lg:translate-y-24" delay={0.12}>
                <Photo
                  asset={PHOTOS.serum}
                  veil={false}
                  objectPosition="center 24%"
                  sizes="(min-width: 1024px) 22vw, 55vw"
                  className="aspect-[3/4] w-full border-[10px] border-[#F4F0E9]"
                />
              </PhotoReveal>
            </div>

            <div className="mt-20 grid gap-6 border-y border-[#806D5E]/25 py-8 sm:grid-cols-3 lg:mt-32">
              {["Quatre cabines individuelles", "Formules végétales marocaines", "Bilan inclus avant chaque soin"].map((label, index) => (
                <Fade key={label} delay={index * 0.07} y={10}>
                  <p className="text-[0.72rem] uppercase tracking-[0.23em] text-[#66564C]">
                    <span className={`${displayClass} mr-4 text-[#9A7962]`}>{index + 1}</span>{label}
                  </p>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#322822] px-5 py-24 text-[#F5EEE5] sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1440px]">
            <Fade y={12}>
              <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`${eyebrow} text-[#CDB69F]`}>02 · Soins signature</p>
                  <h2 className={`${title} mt-6 max-w-4xl`}>Le geste avant la formule.</h2>
                </div>
                <p className="max-w-sm text-[0.92rem] leading-[1.8] text-[#D4C7BA]">
                  Trois portes d&rsquo;entrée, un même principe : observer, ajuster,
                  travailler lentement.
                </p>
              </div>
            </Fade>

            <MobileRail label="Soins signature" className="mobile-signatures mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12">
              <PhotoReveal className="group lg:col-span-5">
                <article className="relative min-h-[34rem] overflow-hidden sm:min-h-[42rem]">
                  <Photo asset={PHOTOS.visage} veil={false} objectPosition="center 54%" sizes="(min-width:1024px) 42vw,100vw" className="absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-[1.025]" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,21,18,.9),transparent_58%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <p className={`${eyebrow} text-[#D8C5B3]`}>Visage · 60—90 min</p>
                    <h3 className={`${displayClass} mt-3 text-4xl sm:text-5xl`}>Lumière douce</h3>
                    <p className="mt-4 max-w-sm text-sm leading-[1.8] text-[#E5D9CD]">Drainage, massage liftant et temps de pose. La peau retrouve du mouvement avant de retrouver de l&rsquo;éclat.</p>
                  </div>
                </article>
              </PhotoReveal>

              <PhotoReveal className="group lg:col-span-7 lg:mt-24" delay={0.08}>
                <article className="relative min-h-[27rem] overflow-hidden sm:min-h-[34rem]">
                  <Photo asset={PHOTOS.massage} veil={false} objectPosition="center 54%" sizes="(min-width:1024px) 58vw,100vw" className="absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-[1.025]" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,21,18,.9),transparent_66%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <p className={`${eyebrow} text-[#D8C5B3]`}>Corps · 60—90 min</p>
                    <h3 className={`${displayClass} mt-3 text-4xl sm:text-5xl`}>Massage Soline</h3>
                    <p className="mt-4 max-w-md text-sm leading-[1.8] text-[#E5D9CD]">Huile d&rsquo;argan tiède, pressions enveloppantes et travail plus profond là où le corps le demande.</p>
                  </div>
                </article>
              </PhotoReveal>

              <PhotoReveal className="group lg:col-span-7" delay={0.04}>
                <article className="relative min-h-[28rem] overflow-hidden sm:min-h-[36rem]">
                  <Photo asset={PHOTOS.hammam} veil={false} objectPosition="center 45%" sizes="(min-width:1024px) 58vw,100vw" className="absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-[1.025]" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,21,18,.88),transparent_62%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <p className={`${eyebrow} text-[#D8C5B3]`}>Hammam · 90 min</p>
                    <h3 className={`${displayClass} mt-3 text-4xl sm:text-5xl`}>Rituel terre & vapeur</h3>
                    <p className="mt-4 max-w-md text-sm leading-[1.8] text-[#E5D9CD]">Savon noir, kessa, rhassoul et repos sous linge chaud, dans une cabine entièrement privatisée.</p>
                  </div>
                </article>
              </PhotoReveal>

              <div className="flex flex-col justify-end border-t border-[#F5EEE5]/20 py-10 lg:col-span-5 lg:px-10 lg:py-16">
                <Fade y={14}>
                  <p className={`${displayClass} text-3xl leading-[1.15] text-[#D8BEA5] sm:text-4xl`}>
                    « Une peau va mieux quand on lui demande moins, mais plus régulièrement. »
                  </p>
                  <a href="#soins" className="mt-9 inline-flex w-fit items-center gap-4 border-b border-[#D8BEA5] pb-2 text-[0.7rem] uppercase tracking-[0.24em]">
                    Voir toute la carte <span>↗</span>
                  </a>
                </Fade>
              </div>
            </MobileRail>
          </div>
        </section>

        <section id="soins" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <Fade y={12}>
              <p className={`${eyebrow} text-[#766052]`}>03 · La carte</p>
              <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_24rem] lg:items-end">
                <h2 className={title}>Choisir moins.<br /><span className="text-[#8A6C58]">Choisir juste.</span></h2>
                <p className="text-[0.95rem] leading-[1.85] text-[#66564C]">Tarifs à la prestation, sans abonnement. Les durées correspondent au temps réellement passé en cabine, bilan inclus.</p>
              </div>
            </Fade>
            <Soins displayClass={displayClass} />
          </div>
        </section>

        <section className="bg-[#D9C8B6] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Fade y={12}>
                <p className={`${eyebrow} text-[#715A4A]`}>04 · Le protocole</p>
                <h2 className={`${title} mt-7`}>Une visite,<br />quatre temps.</h2>
                <p className="mt-7 max-w-sm text-[0.95rem] leading-[1.85] text-[#5D4C41]">Le soin commence avant la cabine et ne se termine pas au dernier geste.</p>
              </Fade>
              <PhotoReveal className="mt-10 hidden lg:block">
                <Photo asset={PHOTOS.preparation} objectPosition="center 52%" sizes="28vw" className="aspect-[4/3] w-full" />
              </PhotoReveal>
            </div>

            <ol className="mobile-protocol lg:col-span-7 lg:col-start-6 lg:flex lg:flex-col lg:justify-between">
              {RITUEL.map((item, index) => (
                <Fade key={item.numero} delay={index * 0.06} y={14}>
                  <li className="grid list-none grid-cols-[3rem_1fr] gap-4 border-t border-[#715A4A]/35 py-7 sm:grid-cols-[5rem_12rem_1fr] sm:gap-6 lg:py-9">
                    <span className={`${displayClass} text-[#8A6C58]`}>{item.numero}</span>
                    <h3 className={`${displayClass} text-2xl sm:text-3xl`}>{item.titre}</h3>
                    <p className="col-start-2 text-[0.92rem] leading-[1.8] text-[#5D4C41] sm:col-start-3">{item.texte}</p>
                  </li>
                </Fade>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
          <div className="mx-auto max-w-[1440px]">
            <Fade y={12}>
              <p className={`${eyebrow} text-[#766052]`}>05 · Atmosphères</p>
              <h2 className={`${title} mt-7 max-w-4xl`}>La lumière, la pierre,<br /><span className="text-[#8A6C58]">la peau, le silence.</span></h2>
            </Fade>

            <MobileRail label="Atmosphères de la maison" className="mobile-atmospheres mt-14 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[16rem] lg:mt-20 lg:auto-rows-[14rem] lg:grid-cols-12 lg:gap-5">
              {GALERIE.map((view, index) => {
                const spans = ["col-span-2 row-span-2 lg:col-span-7", "col-span-1 row-span-2 lg:col-span-5", "col-span-1 row-span-2 lg:col-span-4", "col-span-2 row-span-2 lg:col-span-8", "col-span-1 row-span-2 lg:col-span-7", "col-span-1 row-span-2 lg:col-span-5"];
                return (
                  <PhotoReveal key={view.legende} className={`${spans[index]} group`} delay={(index % 3) * 0.05}>
                    <figure className="relative h-full overflow-hidden bg-[#D9C8B6]">
                      <Photo asset={PHOTOS[view.photo!]} eager veil={false} objectPosition={index === 1 ? "center 45%" : index === 3 ? "center 22%" : "center"} sizes="(min-width:1024px) 55vw, 100vw" className="absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-[1.025]" />
                      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(35,27,23,.72),transparent_58%)]" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[#F7F1E8] sm:p-7">
                        <p className={`${displayClass} text-xl sm:text-2xl`}>{view.legende}</p>
                        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#DDD1C1]">{view.detail}</p>
                      </figcaption>
                    </figure>
                  </PhotoReveal>
                );
              })}
            </MobileRail>
          </div>
        </section>

        <section id="equipe" className="bg-[#2B302A] px-5 py-24 text-[#F7F1E8] sm:px-8 lg:px-12 lg:py-36">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-8">
            <PhotoReveal className="lg:col-span-5">
              <Photo asset={PHOTOS.cabine} parallax={4} objectPosition="58% 68%" sizes="(min-width:1024px) 40vw,100vw" className="aspect-[4/5] w-full" />
            </PhotoReveal>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
              <Fade y={12}>
                <p className={`${eyebrow} text-[#CDB69F]`}>06 · Les mains</p>
                <h2 className={`${title} mt-7`}>Trois praticiennes.<br /><span className="text-[#D8B99B]">Un même suivi.</span></h2>
                <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.85] text-[#D4C7BA]">Vous êtes reçue par la même personne d&rsquo;une fois sur l&rsquo;autre dès que l&rsquo;agenda le permet.</p>
              </Fade>
              <div className="mt-12">
                {EQUIPE.map((member, index) => (
                  <Fade key={member.nom} delay={index * 0.06} y={12}>
                    <article className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[#F7F1E8]/18 py-6 sm:grid-cols-[3rem_12rem_1fr]">
                      <span className={`${displayClass} text-[#D8B99B]`}>0{index + 1}</span>
                      <div>
                        <h3 className={`${displayClass} text-xl`}>{member.nom}</h3>
                        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#B8A99B]">{member.role}</p>
                      </div>
                      <p className="col-start-2 text-sm leading-[1.7] text-[#CFC2B5] sm:col-start-3">{member.texte}</p>
                    </article>
                  </Fade>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="infos" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-40">
          <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Fade y={12}>
                <p className={`${eyebrow} text-[#766052]`}>07 · Rendez-vous</p>
                <h2 className={`${title} mt-7`}>Votre temps<br /><span className="text-[#8A6C58]">commence ici.</span></h2>
                <p className="mt-8 max-w-md text-[0.98rem] leading-[1.9] text-[#66564C]">Un doute entre deux soins ? Appelez-nous : le premier échange sert à choisir le bon protocole, jamais le plus long.</p>
              </Fade>
              <Fade delay={0.1} y={12}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href={`tel:${INSTITUT.telephoneLien}`} className="inline-flex min-h-14 items-center justify-center bg-[#2A211D] px-7 text-[0.72rem] uppercase tracking-[0.22em] text-[#F7F1E8] transition-colors hover:bg-[#8A6C58]">Réserver un soin</a>
                  <a href={`mailto:${INSTITUT.email}`} className="inline-flex min-h-14 items-center justify-center border border-[#806D5E]/45 px-7 text-[0.72rem] uppercase tracking-[0.22em] transition-colors hover:bg-[#D9C8B6]">Écrire à Soline</a>
                </div>
              </Fade>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <DrawLine className="text-[#806D5E]/45" />
              <dl>
                {HORAIRES.map((row) => (
                  <div key={row.jour} className="flex items-center justify-between gap-6 border-b border-[#806D5E]/25 py-5 text-sm">
                    <dt className="text-[#66564C]">{row.jour}</dt>
                    <dd className="font-medium tabular-nums">{row.heures}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className={`${eyebrow} text-[#766052]`}>Adresse</p>
                  <p className="mt-3 leading-[1.8]">{INSTITUT.adresse}</p>
                </div>
                <div>
                  <p className={`${eyebrow} text-[#766052]`}>Contact</p>
                  <a href={`tel:${INSTITUT.telephoneLien}`} className="mt-3 block text-lg">{INSTITUT.telephone}</a>
                  <a href={`mailto:${INSTITUT.email}`} className="mt-1 block text-sm text-[#66564C]">{INSTITUT.email}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-8 sm:px-8 lg:px-12">
          <div className="relative mx-auto min-h-[34rem] max-w-[1440px] overflow-hidden bg-[#322822] text-[#F7F1E8] sm:min-h-[38rem]">
            <Photo asset={PHOTOS.coupole} veil={false} objectPosition="center 50%" sizes="100vw" className="absolute inset-0 h-full w-full opacity-45" />
            <span className="absolute inset-0 bg-[#2A211D]/55" />
            <div className="relative z-10 flex min-h-[34rem] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[38rem]">
              <Fade y={16}>
                <p className={`${eyebrow} text-[#D7C4B1]`}>Une parenthèse à Gauthier</p>
                <h2 className={`${displayClass} mt-6 max-w-5xl text-[3.2rem] leading-[0.92] sm:text-[5.4rem] lg:text-[7rem]`}>Faire moins.<br /><span className="text-[#D8B99B]">Ressentir davantage.</span></h2>
                <a href={`tel:${INSTITUT.telephoneLien}`} className="mt-10 inline-flex min-h-14 items-center justify-center border border-[#F7F1E8]/55 px-8 text-[0.72rem] uppercase tracking-[0.24em] transition-colors hover:bg-[#F7F1E8] hover:text-[#2A211D]">Prendre rendez-vous</a>
              </Fade>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#211A17] px-5 pb-28 pt-16 text-[#EEE5DA] sm:px-8 lg:px-12 lg:pb-16 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className={`${displayClass} text-4xl tracking-[-0.02em] sm:text-6xl`}>{INSTITUT.nom}</p>
              <p className="mt-4 max-w-md text-sm leading-[1.8] text-[#BFB1A4]">{INSTITUT.baseline}</p>
            </div>
            <Link href="/#contact" onClick={() => select("beaute")} className="inline-flex min-h-14 w-fit items-center border border-[#EEE5DA]/45 px-7 text-[0.7rem] uppercase tracking-[0.22em] transition-colors hover:bg-[#EEE5DA] hover:text-[#211A17]">Je veux cette direction</Link>
          </div>
          <div className="mt-14 border-t border-[#EEE5DA]/15 pt-7">
            <p className="max-w-[90ch] text-[0.7rem] leading-[1.7] text-[#A99B8F]">Institut Soline est une marque fictive créée par Evorya. Soins, praticiennes et coordonnées sont inventés.</p>
            <p className="mt-3 max-w-[100ch] text-[0.68rem] leading-[1.7] text-[#8E8176]">{PHOTO_CREDIT}</p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
