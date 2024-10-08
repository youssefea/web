import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Container from 'apps/web/src/components/base-org/Container';
import VideoCardsSection from 'apps/web/src/components/base-org/root/VideoCardsSection';
import BuildExploreSection from 'apps/web/src/components/base-org/root/BuildExploreSection';
import SlidingTextSection from 'apps/web/src/components/base-org/root/SlidingTextSection';
import TransactionsFeesSection from 'apps/web/src/components/base-org/root/TransactionsFeesSection';
import BuildAndRewardSection from 'apps/web/src/components/base-org/root/BuildAndRewardSection';
import ErrorsProvider from 'apps/web/contexts/Errors';
import BlogSection from 'apps/web/src/components/base-org/root/BlogSection';
import dynamic from 'next/dynamic';
import Link from 'apps/web/src/components/Link';

const DynamicThreeHero = dynamic(async () => import('apps/web/src/components/ThreeHero'), {
  ssr: false,
});

export default async function Home() {
  return (
    <ErrorsProvider context="base_landing_page">
      <AnalyticsProvider context="hero">
        <div className="relative h-screen w-full">
          <div className="fixed z-10 h-screen w-full">
            <DynamicThreeHero />
          </div>

          <div className="absolute bottom-0 left-0 z-20 w-full pb-20 text-white">
            <Container>
              <Title level={TitleLevel.Headline}>Base is for everyone.</Title>
              <p className="max-w-[19rem]">
                Bringing the world onchain to create a global economy that increases innovation,
                creativity, and freedom.
              </p>
              <div className="mt-4 flex gap-4">
                <Link href="/getstarted?utm_source=dotorg&medium=hero">
                  <Button variant={ButtonVariants.Secondary} iconName="baseOrgDiagonalUpArrow">
                    Start building
                  </Button>
                </Link>
                <Link href="/names?utm_source=dotorg&medium=hero">
                  <Button variant={ButtonVariants.Outlined} iconName="baseOrgDiagonalUpArrow">
                    Get a Basename
                  </Button>
                </Link>
              </div>
            </Container>
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[50px] w-full bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      </AnalyticsProvider>

      <main className="relative z-20 flex w-full flex-col items-center bg-black">
        <Container>
          <div className="flex flex-col gap-20 pb-40 pt-20 md:gap-40">
            <section>
              <Title level={TitleLevel.Display1}>
                The future of the internet is onchain. Base is here to help you build it.
              </Title>
            </section>
            <BuildExploreSection />
            <VideoCardsSection />
            <SlidingTextSection />
            <TransactionsFeesSection />
            <BuildAndRewardSection />
            <AnalyticsProvider context="blog_carousel">
              <BlogSection />
            </AnalyticsProvider>
          </div>
        </Container>
      </main>
    </ErrorsProvider>
  );
}
