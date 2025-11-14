import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-700 opacity-90" />
      <svg className="absolute -top-24 -right-24 w-96 h-96 text-emerald-300/30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M53.3,-66.9C67.1,-56.9,75.1,-37.8,77,-19.2C78.9,-0.6,74.8,17.4,65.8,31.4C56.8,45.4,42.9,55.4,27.6,62.4C12.3,69.4,-4.5,73.4,-21.5,70.6C-38.4,67.8,-55.6,58.1,-64.7,43.4C-73.8,28.7,-74.7,9.1,-70.7,-8.8C-66.8,-26.7,-57.9,-42.8,-44.5,-52.9C-31.1,-62.9,-13.1,-66.9,4.8,-72.8C22.7,-78.6,45.4,-86.9,53.3,-66.9Z" transform="translate(100 100)" />
      </svg>
      <div className="relative max-w-6xl mx-auto px-6 py-20 text-white grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Ulin
            <span className="block text-emerald-100 mt-2">Jelajah, Menginap, Menyatu dengan Alam</span>
          </h1>
          <p className="mt-5 text-emerald-50/90 text-lg">Platform pemesanan homestay dan paket wisata bertema hijau alam. Temukan tempat menginap hangat dan petualangan seru dalam satu aplikasi.</p>
          <div className="mt-8 flex gap-3">
            <a href="#explore" className="bg-white text-emerald-700 font-semibold px-5 py-3 rounded-lg hover:bg-emerald-50 transition">Jelajahi Sekarang</a>
            <a href="#packages" className="border border-emerald-200 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition">Lihat Paket</a>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md border border-white/20">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-emerald-50">Lokasi</label>
              <input className="mt-1 w-full px-3 py-2 rounded-md text-gray-800" placeholder="Bandung, Bali, dll"/>
            </div>
            <div>
              <label className="block text-emerald-50">Tanggal</label>
              <input type="date" className="mt-1 w-full px-3 py-2 rounded-md text-gray-800"/>
            </div>
            <div>
              <label className="block text-emerald-50">Tamu</label>
              <input type="number" min="1" className="mt-1 w-full px-3 py-2 rounded-md text-gray-800" placeholder="2"/>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md">Cari</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-12 mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-800">{title}</h2>
      {subtitle && <p className="text-emerald-700/70 mt-1">{subtitle}</p>}
    </div>
  )
}

function Card({ item, type }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-emerald-100">
      <div className="h-40 bg-gradient-to-br from-emerald-200 to-emerald-300" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-emerald-900">{item.name || item.title}</h3>
          <span className="text-emerald-700 font-semibold">{type === 'homestay' ? `Rp ${item.price_per_night.toLocaleString()}/mlm` : `Rp ${item.price.toLocaleString()}`}</span>
        </div>
        <p className="text-emerald-800/70 text-sm mt-1">{item.location}</p>
        {type === 'homestay' && (
          <p className="text-emerald-700/70 text-sm mt-1">Maks {item.max_guests} tamu • {item.amenities?.slice(0,3).join(' • ')}</p>
        )}
        {type === 'package' && (
          <p className="text-emerald-700/70 text-sm mt-1">{item.highlights?.slice(0,3).join(' • ')}</p>
        )}
        <button className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md">Pesan</button>
      </div>
    </div>
  )
}

export default function App(){
  const [homestays, setHomestays] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [h, p] = await Promise.all([
          fetch(`${API_BASE}/homestays`).then(r => r.json()),
          fetch(`${API_BASE}/packages`).then(r => r.json()),
        ])
        setHomestays(h)
        setPackages(p)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-900">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600" />
            <span className="font-extrabold text-emerald-800 text-lg">ulin</span>
          </div>
          <div className="hidden md:flex gap-6 text-emerald-700">
            <a href="#explore" className="hover:text-emerald-900">Home Stay</a>
            <a href="#packages" className="hover:text-emerald-900">Paket Wisata</a>
            <a href="#contact" className="hover:text-emerald-900">Bantuan</a>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md">Masuk</button>
        </div>
      </nav>

      <Hero />

      <section id="explore" className="max-w-6xl mx-auto px-6 mt-10">
        <SectionTitle title="Rekomendasi Home Stay" subtitle="Pilihan nyaman untuk beristirahat dekat alam" />
        {loading ? (
          <div className="text-emerald-700">Memuat...</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {homestays.map(item => (
              <Card key={item.id} item={item} type="homestay" />
            ))}
          </div>
        )}
      </section>

      <section id="packages" className="max-w-6xl mx-auto px-6 mt-12 mb-20">
        <SectionTitle title="Paket Wisata Alam" subtitle="Rangkai liburanmu dengan aktivitas seru" />
        {loading ? (
          <div className="text-emerald-700">Memuat...</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packages.map(item => (
              <Card key={item.id} item={item} type="package" />
            ))}
          </div>
        )}
      </section>

      <footer className="bg-emerald-900 text-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600" />
              <span className="font-extrabold text-white text-lg">ulin</span>
            </div>
            <p className="text-emerald-100/80">Teman perjalananmu untuk menginap nyaman dan berpetualang menyatu dengan alam.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Layanan</h4>
            <ul className="space-y-1 text-emerald-100/80 text-sm">
              <li>Home Stay</li>
              <li>Paket Wisata</li>
              <li>Dukungan Pelanggan</li>
            </ul>
          </div>
          <div id="contact">
            <h4 className="font-semibold mb-2">Kontak</h4>
            <p className="text-emerald-100/80 text-sm">Email: support@ulin.app</p>
          </div>
        </div>
        <div className="border-t border-emerald-800 py-4 text-center text-emerald-200 text-sm">© {new Date().getFullYear()} ulin. All rights reserved.</div>
      </footer>
    </div>
  )
}
