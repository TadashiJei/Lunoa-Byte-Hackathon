'use client'

import { useState, useEffect } from 'react'
import { X, Download, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             (window.navigator as any).standalone === true
    }

    // Check if iOS
    const checkIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent)
    }

    // Check if already installed
    const checkInstalled = () => {
      return checkStandalone() || sessionStorage.getItem('pwa-dismissed') === 'true'
    }

    setIsIOS(checkIOS())
    setIsStandalone(checkStandalone())
    setIsInstalled(checkInstalled())

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after 3 seconds if not already installed
      if (!checkInstalled()) {
        setTimeout(() => {
          setShowPrompt(true)
        }, 3000)
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      sessionStorage.setItem('pwa-installed', 'true')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Show prompt for iOS users after 3 seconds
    if (checkIOS() && !checkInstalled()) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    sessionStorage.setItem('pwa-dismissed', 'true')
  }

  // Don't show if already installed or dismissed
  if (!showPrompt || isStandalone) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="bg-background border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Image
                src="/lunoa-icon.png"
                alt="Lunoa"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground">
                {isInstalled ? 'App Already Installed!' : 'Install Lunoa App'}
              </h3>
              
              {isInstalled ? (
                <p className="text-xs text-muted-foreground mt-1">
                  You can access Lunoa directly from your home screen.
                </p>
              ) : isIOS ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Tap <Share className="inline w-3 h-3 mx-1" /> then "Add to Home Screen"
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Get quick access and work offline
                </p>
              )}
              
              <div className="flex gap-2 mt-3">
                {!isInstalled && !isIOS && deferredPrompt && (
                  <Button
                    size="sm"
                    onClick={handleInstallClick}
                    className="text-xs h-7 px-3"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Install
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="text-xs h-7 px-3"
                >
                  {isInstalled ? 'Got it' : 'Maybe later'}
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
