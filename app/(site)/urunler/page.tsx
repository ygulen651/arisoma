'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories } from '@/lib/sanity'

export default function UrunlerPage() {
  const searchParams = useSearchParams()
  const [activeKategori, setActiveKategori] = useState('tumu')
  const [searchQuery, setSearchQuery] = useState('')
  const [showYeni, setShowYeni] = useState(false)
  const [showVitrin, setShowVitrin] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Veri yüklenemedi:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const kategoriParam = searchParams.get('kategori')
    if (kategoriParam) {
      setActiveKategori(kategoriParam)
    }
  }, [searchParams])

  const filteredUrunler = useMemo(() => {
    return products.filter((urun: any) => {
      const matchesKategori = activeKategori === 'tumu' || urun.category?.slug?.current === activeKategori
      const matchesSearch =
        urun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (urun.description?.[0]?.children?.[0]?.text || '').toLowerCase().includes(searchQuery.toLowerCase())
      const matchesYeni = !showYeni || urun.isNew
      const matchesVitrin = !showVitrin || urun.isFeatured

      return matchesKategori && matchesSearch && matchesYeni && matchesVitrin
    })
  }, [products, activeKategori, searchQuery, showYeni, showVitrin])

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caramel-500 mx-auto"></div>
            <p className="mt-4 text-choco-600">Ürünler yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-choco-900 mb-3 md:mb-4">
            Ürünlerimiz
          </h1>
          <p className="text-base md:text-xl text-choco-600 max-w-2xl mx-auto px-4">
            Lezzet dolu ürün yelpazemizi keşfedin
          </p>
        </motion.div>

        {/* Filters */}
        <div className="sticky top-16 md:top-24 z-40 bg-cream-50/95 backdrop-blur-lg border-y border-choco-900/10 py-3 md:py-4 mb-8">
          <div className="container mx-auto px-4">
            {/* Search */}
            <div className="relative mb-3 md:mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-choco-600" size={18} />
              <Input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 md:h-12 text-sm md:text-base"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={activeKategori} onValueChange={setActiveKategori}>
              <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <TabsList className="inline-flex w-auto min-w-full h-auto bg-cream-100 p-1 gap-1">
                  <TabsTrigger 
                    value="tumu" 
                    className="data-[state=active]:bg-caramel-500 data-[state=active]:text-white px-3 md:px-4 py-1.5 md:py-2 whitespace-nowrap rounded-md text-sm md:text-base"
                  >
                    Tümü
                  </TabsTrigger>
                  {categories.map((kategori: any) => (
                    <TabsTrigger
                      key={kategori._id}
                      value={kategori.slug.current}
                      className="data-[state=active]:bg-caramel-500 data-[state=active]:text-white px-3 md:px-4 py-1.5 md:py-2 whitespace-nowrap rounded-md text-sm md:text-base"
                    >
                      {kategori.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                onClick={() => setShowYeni(!showYeni)}
                className={`cursor-pointer transition-colors px-3 py-1.5 text-sm ${
                  showYeni ? 'bg-gold-400 text-white' : 'bg-cream-100 text-choco-700 hover:bg-gold-400/20'
                }`}
              >
                Yeni Ürünler
              </Badge>
              <Badge
                onClick={() => setShowVitrin(!showVitrin)}
                className={`cursor-pointer transition-colors px-3 py-1.5 text-sm ${
                  showVitrin ? 'bg-caramel-500 text-white' : 'bg-cream-100 text-choco-700 hover:bg-caramel-500/20'
                }`}
              >
                Vitrin Ürünleri
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUrunler.map((urun: any, index: number) => (
            <motion.div
              key={urun._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard urun={urun} index={index} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredUrunler.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-choco-600">Ürün bulunamadı</p>
            <p className="text-choco-500 mt-2">Farklı filtreler deneyin</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

