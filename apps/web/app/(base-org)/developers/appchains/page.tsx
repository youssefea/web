import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import basenet from 'apps/web/src/components/Developers/Appchains/basenet.svg';
import { InfoCards } from 'apps/web/src/components/Developers/Appchains/InfoCards';
import { L2InfoCards } from 'apps/web/src/components/Developers/Appchains/L2InfoCards';
import { Pricing } from 'apps/web/src/components/Developers/Appchains/Pricing';
import { Testimonials } from 'apps/web/src/components/Developers/Appchains/Testimonials';
import { CtaBanner } from 'apps/web/src/components/Developers/Shared/CtaBanner';
import Image, { StaticImageData } from 'next/image';

const CDP_APPCHAIN_URL = 'https://portal.cdp.coinbase.com/products/base-l3';

export default async function Appchains() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
        <div className="flex flex-col items-center gap-1 pt-20">
          <div className="flex items-center gap-2 pb-6">
            <Image
              src={basenet as StaticImageData}
              alt="basenet"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="text-[#FFDF44]">
              Base Appchains
            </Title>
          </div>
          <Title level={TitleLevel.Display3}>Deploy your chain on Base with zero code.</Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-center text-gray-muted">
            Fast, cheaper transactions at scale—built on Base, in minutes.
          </Title>

          <div className="flex gap-6 pt-6">
            <ButtonWithLinkAndEventLogging
              href={CDP_APPCHAIN_URL}
              iconName="arrowRight"
              target="_blank"
              variant={ButtonVariants.Secondary}
              eventName="appchains-get-started"
            >
              Start Building
            </ButtonWithLinkAndEventLogging>

            <ButtonWithLinkAndEventLogging
              href=""
              iconName="arrowRight"
              target="_blank"
              variant={ButtonVariants.Outlined}
              eventName="appchains-docs"
            >
              Documentation
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>

        <InfoCards />
        <L2InfoCards />
        <Pricing />
        <Testimonials />
        <CtaBanner
          title="Your own blockspace starting at $1/month"
          description="Unlock fast and cheap transactions at scale, with dedicated blockspace and seamless integration with Base tools."
          cta={
            <ButtonWithLinkAndEventLogging
              variant={ButtonVariants.Secondary}
              iconName="arrowRight"
              buttonClassNames="flex w-40 items-center px-4 py-3"
              href={CDP_APPCHAIN_URL}
              target="_blank"
              eventName="minikit-get-started"
            >
              Get started
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
