import { Metadata } from 'next';
import { FrameButtonMetadata } from '@coinbase/onchainkit/frame';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { BestOfEthereum } from 'apps/web/src/components/BestOfEthereum/BestOfEthereum';
import { Commitment } from 'apps/web/src/components/Commitment/Commitment';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { EmpoweredByCoinbase } from 'apps/web/src/components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from 'apps/web/src/components/Features/Features';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { JoinTheCommunity } from 'apps/web/src/components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from 'apps/web/src/components/Partnerships/Partnerships';
import ThreeHero from 'apps/web/src/components/ThreeHero';
import Card from 'apps/web/src/components/base-org/Card';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

/* Farcaster Metadatas */
const buttons: FrameButtonMetadata[] = [
  {
    action: 'link',
    label: 'Read the docs',
    target: 'https://docs.base.org/',
  },
  {
    action: 'link',
    label: 'Bridge assets',
    target: 'https://bridge.base.org/deposit',
  },
];

const otherMetadata: Metadata['other'] = {
  'fc:frame:image': 'https://base.org/images/base-open-graph.png',
};

buttons
  .map((button, index) => {
    const metadataKey = `fc:frame:button:${index + 1}`;
    otherMetadata[metadataKey] = [button.label];
    if (button.action) otherMetadata[`${metadataKey}:action`] = [button.action];
    if (button.target) otherMetadata[`${metadataKey}:target`] = [button.target];
    return otherMetadata;
  })
  .flat();

/* Page Metadatas */
export const metadata: Metadata = {
  other: otherMetadata,
};

export default async function Home() {
  return (
    <AnalyticsProvider context="base_landing_page">
      <AnalyticsProvider context="hero">
        <div className="relative h-[875px] w-full">
          <ThreeHero />

          <div className="absolute bottom-0 left-0 w-full p-12 text-white">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 ">
              <Title level={TitleLevel.Headline}>Base is for everyone.</Title>
              <p className="max-w-[19rem]">
                Bringing the world onchain to create a global economy that increases innovation,
                creativity, and freedom.
              </p>
              <div className="mt-4 flex gap-4">
                <Button variant={ButtonVariants.Secondary} iconName="baseOrgdiagonalUpArrow">
                  Start building
                </Button>
                <Button variant={ButtonVariants.Outlined} iconName="baseOrgdiagonalUpArrow">
                  Get a Basename
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnalyticsProvider>
      <main className="flex w-full flex-col items-center bg-black">
        <div className="container flex w-full flex-row items-center gap-12 bg-black p-12 pb-[96px] text-white">
          <Card>
            <p className="text-white">Hello, welcome to base</p>
          </Card>
          <Card>
            <br />
            <Title level={TitleLevel.Display1}>Display 1</Title>
            <br />
            <Title level={TitleLevel.Display2}>Display 2</Title>
            <br />
            <Title level={TitleLevel.Display3}>Display 3</Title>
            <br />
            <Title level={TitleLevel.Display4}>Display 4</Title>
            <br />
            <Title level={TitleLevel.Title1}>Title 1</Title>
            <br />
            <Title level={TitleLevel.Title2}>Title 2</Title>
            <br />
            <Title level={TitleLevel.Title3}>Title 3</Title>
            <br />
            <Title level={TitleLevel.Title4}>Title 4</Title>
            <br />
            <Title level={TitleLevel.Headline}>Headline</Title>
            <br />
          </Card>
          <Card>
            <p className="text-white">Hello, welcome to base</p>
            <br />
            <br />
            <Button roundedFull>Connect</Button>
            <br />
            <br />
            <Button>Button</Button>
            <br />
            <br />
            <Button disabled>Button Disabled</Button>

            <br />
            <br />
            <Button variant={ButtonVariants.Secondary}>Button</Button>
            <br />
            <br />
            <Button variant={ButtonVariants.Secondary} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button variant={ButtonVariants.Outlined}>Button</Button>
            <br />
            <br />
            <Button variant={ButtonVariants.Outlined} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow">Button</Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Secondary}>
              Button
            </Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Secondary} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Outlined}>
              Button
            </Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Outlined} disabled>
              Button Disabled
            </Button>
          </Card>
        </div>
        <Divider />
        <Features />
        <Divider />
        <BestOfEthereum />
        <Divider />
        <EmpoweredByCoinbase />
        <Divider />
        <Partnerships />
        <Divider />
        <Commitment />
        <Divider />
        <JoinTheCommunity />
        <Divider />
        <GetConnected />
      </main>
    </AnalyticsProvider>
  );
}
