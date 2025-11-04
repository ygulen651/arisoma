'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, Send, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const formSchema = z.object({
  ad: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  eposta: z.string().email('Geçerli bir e-posta adresi giriniz'),
  konu: z.string().min(3, 'Konu en az 3 karakter olmalı'),
  mesaj: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
})

type FormData = z.infer<typeof formSchema>

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/iletisim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Form gönderim hatası:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-caramel-500 to-gold-400 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            İletişim
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-choco-900 mb-8">
              Bizimle İletişime Geçin
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-caramel-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-caramel-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-choco-900 mb-1">Telefon</h3>
                  <p className="text-choco-600">0090 539 770 18 72</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-caramel-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-caramel-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-choco-900 mb-1">E-posta</h3>
                  <p className="text-choco-600">info@ariso.com.tr</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-caramel-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-caramel-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-choco-900 mb-1">Adres</h3>
                  <p className="text-choco-600">
                    ATAKÖY 7-8-9-10. KISIM MAH. ÇOBANÇEŞME E-5 YAN YOL CAD.
                    <br />
                    F NO: 22 /6 İÇ KAPI NO: 145
                    <br />
                    BAKIRKÖY/ İSTANBUL
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-12 w-32 h-32 mx-auto lg:mx-0">
              <div className="w-full h-full bg-gradient-to-b from-choco-900 to-choco-700 rounded-full animate-gentle-pulse" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-cream-100"
          >
            <h2 className="text-3xl font-serif font-bold text-choco-900 mb-6">
              Mesaj Gönderin
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="ad" className="text-choco-900">
                  Adınız Soyadınız
                </Label>
                <Input
                  id="ad"
                  {...register('ad')}
                  className="mt-1"
                  placeholder="Adınız ve soyadınız"
                />
                {errors.ad && (
                  <p className="text-sm text-red-500 mt-1">{errors.ad.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="eposta" className="text-choco-900">
                  E-posta
                </Label>
                <Input
                  id="eposta"
                  type="email"
                  {...register('eposta')}
                  className="mt-1"
                  placeholder="ornek@email.com"
                />
                {errors.eposta && (
                  <p className="text-sm text-red-500 mt-1">{errors.eposta.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="konu" className="text-choco-900">
                  Konu
                </Label>
                <Input
                  id="konu"
                  {...register('konu')}
                  className="mt-1"
                  placeholder="Mesajınızın konusu"
                />
                {errors.konu && (
                  <p className="text-sm text-red-500 mt-1">{errors.konu.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="mesaj" className="text-choco-900">
                  Mesajınız
                </Label>
                <Textarea
                  id="mesaj"
                  {...register('mesaj')}
                  className="mt-1 min-h-[150px]"
                  placeholder="Mesajınızı buraya yazın..."
                />
                {errors.mesaj && (
                  <p className="text-sm text-red-500 mt-1">{errors.mesaj.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-caramel-500 to-gold-400 text-white text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Gönderiliyor...'
                ) : (
                  <>
                    Gönder
                    <Send className="ml-2" size={20} />
                  </>
                )}
              </Button>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
                >
                  Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Harita Bölümü */}
      <section className="py-12 bg-gradient-to-b from-cream-50 to-cream-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-choco-900 mb-8">Bizi Ziyaret Edin</h2>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="w-full h-[500px] md:h-[600px]">
              <iframe 
                src="https://maps.google.com/maps?q=40.9946,28.8709&hl=tr&z=15&output=embed"
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konumumuz"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

