import { createClient } from '@sanity/client'

// Sanity client
const client = createClient({
  projectId: '4z1l646l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Bu environment variable'ı Vercel'de ayarlayın
})

// Hero slides ekleme
async function addHeroSlides() {
  try {
    const heroSlides = [
      {
        _type: 'heroSlide',
        title: 'Sütlü Çikolatanın En Kremalisi',
        subtitle: 'Ustaların elinden, %100 doğal malzemelerle hazırlanır.',
        primaryHref: '/urunler',
        secondaryHref: '/hakkimizda',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-hero-slide-1' // Sanity'de bu asset'i oluşturun
          }
        }
      },
      {
        _type: 'heroSlide',
        title: 'Fındıklı Gofrette İncecik Katlar',
        subtitle: 'Her lokmada tazelik ve çıtırlık.',
        primaryHref: '/urunler',
        secondaryHref: '/hakkimizda',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: 'image-hero-slide-2' // Sanity'de bu asset'i oluşturun
          }
        }
      }
    ]

    // Önce mevcut hero slides'ları temizle
    await client.delete({ query: '*[_type == "heroSlide"]' })

    // Yeni hero slides ekle
    for (const slide of heroSlides) {
      await client.create(slide)
    }

    console.log('✅ Hero slides başarıyla eklendi!')

  } catch (error) {
    console.error('❌ Hero slides eklenemedi:', error.message)
  }
}

// Site settings güncelleme (hero slides ekleme)
async function updateSiteSettings() {
  try {
    // Mevcut site settings'i al
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]')

    if (!siteSettings) {
      // Site settings yoksa oluştur
      await client.create({
        _type: 'siteSettings',
        title: 'Bisküvi Fabrikası',
        heroSlides: await getHeroSlides()
      })
    } else {
      // Mevcut site settings'i güncelle
      await client.patch(siteSettings._id).set({
        heroSlides: await getHeroSlides()
      }).commit()
    }

    console.log('✅ Site settings güncellendi!')

  } catch (error) {
    console.error('❌ Site settings güncellenemedi:', error.message)
  }
}

// Yardımcı fonksiyon - hero slides'ı getir
async function getHeroSlides() {
  const slides = await client.fetch('*[_type == "heroSlide"]{_id, title, subtitle, image, primaryHref, secondaryHref}')
  return slides.map(slide => ({
    _type: 'heroSlide',
    _key: slide._id,
    title: slide.title,
    subtitle: slide.subtitle,
    image: slide.image,
    primaryHref: slide.primaryHref,
    secondaryHref: slide.secondaryHref
  }))
}

// Ana fonksiyon
async function main() {
  console.log('🚀 Hero slides ekleniyor...')

  if (!process.env.SANITY_API_TOKEN) {
    console.log('❌ SANITY_API_TOKEN environment variable eksik!')
    console.log('💡 Vercel Dashboard → Project Settings → Environment Variables kısmına ekleyin:')
    console.log('   SANITY_API_TOKEN=sk_...')
    return
  }

  await addHeroSlides()
  await updateSiteSettings()

  console.log('✨ İşlem tamamlandı!')
}

// Eğer doğrudan çalıştırılırsa
if (require.main === module) {
  main()
}

export { addHeroSlides, updateSiteSettings }
