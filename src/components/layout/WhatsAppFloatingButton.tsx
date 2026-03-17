'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'

import { getWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export default function WhatsAppFloatingButton() {
  const pathname = usePathname()

  const context = pathname.includes('logistique')
    ? 'logistics'
    : pathname.includes('shopping')
      ? 'shopping'
      : pathname.includes('etudes')
        ? 'studies'
        : pathname.includes('suivi')
          ? 'tracking'
          : 'home'

  return (
    <a
      href={getWhatsAppUrl(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-24 right-4 md:bottom-28 md:right-8 z-50',
        'bg-whatsapp hover:bg-whatsapp-dark',
        'w-14 h-14 rounded-full',
        'flex items-center justify-center',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-200 hover:scale-110',
      )}
      aria-label="Contacter SEZY sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
