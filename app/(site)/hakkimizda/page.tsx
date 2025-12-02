'use client'

import { motion } from 'framer-motion'
import { Factory, Award, Globe, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const milestones = [
  {
    year: '1999-2014',
    title: 'İlk Adımlar',
    description: 'Ülker ile iş birliği içinde Kazakistan, Ukrayna, İstanbul ve Karaman\'daki yatırımlarda önemli bir iş ortağı olarak çalıştık.',
  },
  {
    year: '2014',
    title: 'Yeni Dönem',
    description: 'Tayyar Yatırım olarak hisselerimizi sattık ve kendi markamız Ariso ile yola devam etmek için Modern Çikolata fabrikasını kurduk.',
  },
  {
    year: '2015',
    title: 'Ariso Markası',
    description: 'Ariso markası olarak yıllık 140.000 ton kapasiteye sahip Modern Çikolata tesislerinde üretime başladık.',
  },
  {
    year: '2024',
    title: 'Geniş Ürün Yelpazesi',
    description: 'Bisküvi, çikolata, kek, kraker, çikolata bar, gofret ve kremalı çikolata olmak üzere 7 ana kategoride 300\'den fazla ürünle hizmet veriyoruz.',
  },
]

const values = [
  {
    icon: Factory,
    title: 'Kalite',
    description: 'En yüksek kalite standartlarında üretim yapıyoruz',
  },
  {
    icon: Award,
    title: 'Mükemmeliyet',
    description: 'Her üründe mükemmellik arayışımız devam ediyor',
  },
  {
    icon: Globe,
    title: 'Global Vizyon',
    description: 'Türk lezzetlerini dünyaya taşıyoruz',
  },
  {
    icon: Users,
    title: 'İnsan Odaklı',
    description: 'Çalışanlarımız ve müşterilerimiz bizim için en değerli',
  },
]

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-choco-900 to-choco-700 text-cream-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Hikayemiz
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-cream-100">
            Ariso markası, 2015 yılında xxx&apos;ın gıda sektörüne yaptığı yatırımla yıllık 140.000 ton kapasiteye ve 30 yıllık sektör tecrübesine sahip Modern Çikolata tesislerinde üretilmektedir. Portföyünde bisküvi, çikolata, kek, kraker, çikolata bar, gofret ve kremalı çikolata olmak üzere 7 ana kategoride 300&apos;den fazla ürün barındırır. Ülker&apos;in, 1999-2014 yılları arasında Kazakistan, Ukrayna, İstanbul ve Karaman yatırımlarının bir iş ortağı olan Tayyar Yatırım, 2014 yılında hisselerini sattı ve aynı sektörlerde çalışmalarına devam etmek için Modern Çikolata fabrikasını kurdu.
          </p>
        </motion.div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 left-10 w-64 h-64 border-4 border-gold-400 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-10 right-10 w-48 h-48 border-4 border-caramel-500 rounded-full"
          />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center text-choco-900 mb-12">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-caramel-500 to-gold-400 rounded-full flex items-center justify-center">
                  <value.icon size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-choco-900 mb-2">{value.title}</h3>
                <p className="text-choco-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center text-choco-900 mb-12">
            Kilometre Taşlarımız
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={milestone.year}
                    className="bg-white rounded-2xl px-6 border-2 border-transparent hover:border-caramel-500 transition-all"
                  >
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-caramel-500">{milestone.year}</span>
                        <span className="text-xl font-serif font-semibold text-choco-900">
                          {milestone.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-choco-600 pt-4">
                      {milestone.description}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}

