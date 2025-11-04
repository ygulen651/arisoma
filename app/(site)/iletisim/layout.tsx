import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim - Bize Ulaşın, Sorularınızı Sorun',
  description: 'TORİO BİSKÜVİ ÇİKOLATA GIDA SANAYİ VE TİCARET LİMİTED ŞİRKETİ ile iletişime geçin. Telefon: +90 539 770 18 72, E-posta: info@ariso.com.tr. ATAKÖY 7-8-9-10. KISIM MAH. ÇOBANÇEŞME E-5 YAN YOL CAD. F NO: 22 /6 İÇ KAPI NO: 145 BAKIRKÖY/ İSTANBUL',
  keywords: [
    'bisküvi fabrikası iletişim',
    'telefon',
    'e-posta',
    'adres',
    'müşteri hizmetleri',
    'sipariş',
    'toptan satış',
  ],
  openGraph: {
    title: 'İletişim | Bisküvi Fabrikası',
    description: 'Bizimle iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın.',
    type: 'website',
  },
  alternates: {
    canonical: '/iletisim',
  },
}

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

