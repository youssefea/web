'use client';

import { Suspense } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import logo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/logo.svg';
import MenuDesktop from 'apps/web/src/components/base-org/shared/TopNavigation/MenuDesktop';
import MenuMobile from 'apps/web/src/components/base-org/shared/TopNavigation/MenuMobile';
import { DynamicWrappedGasPriceDropdown } from 'apps/web/src/components/base-org/shared/TopNavigation/GasPriceDropdown';
import {
  ConnectWalletButtonVariants,
  DynamicWrappedConnectWalletButton,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';

export type SubItem = {
  name: string;
  description?: string;
  href: string;
};

export type TopNavigationLink = {
  name: string;
  href: string;
  subItems: SubItem[];
  analyticContext: string;
};

const links: TopNavigationLink[] = [
  {
    name: 'Explore',
    analyticContext: 'explore',
    href: '/ecosystem',
    subItems: [
      { name: 'Apps', description: 'Discover applications on Base', href: '/ecosystem' },
      {
        name: 'Bridge',
        description: 'Get started by bridging to Base',
        href: 'https://bridge.base.org',
      },
    ],
  },
  {
    name: 'Builders',
    analyticContext: 'builders',
    href: '/builders',
    subItems: [
      {
        name: 'Documentation',
        description: '',
        href: 'https://docs.base.org',
      },
      {
        name: 'AgentKit',
        description: '',
        href: '/agentkit',
      },
      {
        name: 'Base Appchains',
        description: '',
        href: '/appchains',
      },
      {
        name: 'Smart Wallet',
        description: '',
        href: '/smartwallet',
      },
      {
        name: 'MiniKit',
        description: '',
        href: '/minikit',
      },
      {
        name: 'OnchainKit',
        description: '',
        href: '/onchainkit',
      },
      {
        name: 'Verifications',
        description: '',
        href: '/verify',
      },
      {
        name: 'Status Page',
        description: '',
        href: 'https://status.base.org',
      },
      {
        name: 'Bug Bounty',
        description: '',
        href: 'https://hackerone.com/base',
      },
      {
        name: 'Block Explorer',
        description: '',
        href: 'https://basescan.org',
      },
      {
        name: 'GitHub',
        description: '',
        href: 'https://github.com/base-org',
      },
      {
        name: 'Blog',
        description: '',
        href: 'https://blog.base.org/',
      },
      {
        name: 'Builder Stories',
        description: '',
        href: '/stories',
      },
    ],
  },
  {
    name: 'Community',
    analyticContext: 'communnity',
    href: '/resources',
    subItems: [
      { name: 'Resources', description: 'Everything you need to get started', href: '/resources' },
      { name: 'Grants', description: 'Fund your projects on Base', href: '/resources#GetFunded' },
      {
        name: 'Events',
        description: 'Connect with the Base community',
        href: '/resources#GetInvolved',
      },
      {
        name: 'Media Kit',
        description: 'Base brand assets and guides',
        href: 'https://github.com/base-org/brand-kit',
      },
    ],
  },
  {
    name: 'About',
    analyticContext: 'about',
    href: '/about',
    subItems: [
      { name: 'Vision', description: "Base's mission, vision, and strategy", href: '/about' },
      {
        name: 'Blog',
        description: 'Latest updates from the Base core team',
        href: 'https://base.mirror.xyz/',
      },
      { name: 'Jobs', description: 'Join Base to build a new internet', href: '/jobs' },
    ],
  },
  {
    name: 'Socials',
    analyticContext: 'socials',
    href: '#socials',
    subItems: [
      { name: 'X', href: 'https://x.com/base' },
      { name: 'Farcaster', href: 'https://warpcast.com/base' },
      { name: 'Github', href: 'https://github.com/base' },
      { name: 'Discord', href: 'https://discord.com/invite/buildonbase' },
    ],
  },
];

const cryptoExcludedPaths = ['/jobs', '/about', '/ecosystem', '/build'];

export default function TopNavigation() {
  const pathname = usePathname();
  const showGasDropdownAndConnectWallet = !cryptoExcludedPaths.includes(pathname ?? '');
  return (
    <AnalyticsProvider context="navbar">
      <nav className="fixed top-0 z-50 w-full shrink-0 px-[1rem] py-4 md:px-[1.5rem] lg:px-[2rem]">
        <div className="flex w-full items-center justify-between gap-2">
          {/* Logo and Gas price section */}
          <div className="relative z-20 flex items-center gap-4 md:min-w-[16rem]">
            <Link href="/" className="flex min-h-[3rem] min-w-[3rem]">
              <Image src={logo as StaticImageData} alt="Base Logo" />
            </Link>
            {showGasDropdownAndConnectWallet && <DynamicWrappedGasPriceDropdown />}
          </div>

          <div className="hidden md:inline-block">
            <MenuDesktop links={links} />
          </div>

          <div className="mr-auto inline-block md:hidden">
            <MenuMobile links={links} />
          </div>

          {/* Connect Wallet button */}
          <div className="flex items-end justify-end md:min-w-[16rem]">
            {showGasDropdownAndConnectWallet && (
              <Suspense>
                <DynamicWrappedConnectWalletButton
                  connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg}
                />
              </Suspense>
            )}
          </div>
        </div>
      </nav>
    </AnalyticsProvider>
  );
}
