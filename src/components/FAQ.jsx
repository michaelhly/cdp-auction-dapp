import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

const FAQ = () => {
  return (
    <React.Fragment>
      <h2 className="mb-3">FAQ</h2>
      <div className="mb-5 p-3">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What is a CDP?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                A CDP (or Collateralized Debt Position) is an instrument that
                allows you to deposit Ether as collateral and draw DAI
                stablecoins against the amount of Ether deposited. More info on
                DAI can be found{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://makerdao.com/en/dai/"
                >
                  here
                </a>
                .
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What is cdp.Auction?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                cdp.Auction is a decentralized marketplace for people to buy and
                sell CDPs.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What can I do on cdp.Auction?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                cdp.Auction provides a platform for you to list distressed CDPs
                for sale. By auctioning your CDP, you can avoid the 15%
                liquidation premium and close your position without paying back
                the amount of DAI owed. Additionally, you can monitor each
                auction listing and arbitrage between the listing value and face
                value of a CDP.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What is the listing value of a CDP?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                The listing value of a CDP is the amount of tokens asked by the
                CDP owner to release their CDP from auction.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What is the face value of a CDP?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                The face value of a CDP is amount of collateral left after debt
                and fees, i.e. Face Value = Collateral Value - (Debt Value +
                Fees).
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What is a proxy profile?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                A proxy profile is a utility smart contract that allows you to
                execute a series of actions atomically on Ethereum. More info on
                proxy contracts can be found{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://dapp.tools/dappsys/ds-proxy.html"
                >
                  here
                </a>
                .
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What do I need to use cdp.Auction?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                You must have a proxy profile to interact with the auction smart
                contracts. If you do not have a proxy profile, you can create
                one at the home page. After that, please use the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdp.makerdao.com/"
                >
                  CDP Portal
                </a>{" "}
                to migrate all your CDPs to your proxy profile.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                How do I list a CDP for sale?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                After your have migrated your CDP to your proxy profile, you can
                list your CDP for auction via the user panel on the home page.
                To create an auction, you must specify the amount of tokens you
                wish to receive and the duration of the auction. At any point
                before the full duration of the auction, someone can purchase
                your CDP for the amount of tokens you have specified at the
                creation of the auction.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                How does the auction work?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                As a buyer, you can either purchase a CDP at the asking price,
                or you can submit a bid offer to stake an interest on the CDP.
                As long as neither the auction or the bid order is expired, the
                CDP owner can take any of the bid offers staked to their CDP.
              </span>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h5 className="u-position-relative">
                What happens to my CDP when it is on auction?
                <div className="accordion__arrow" role="presentation" />
              </h5>
            </AccordionItemTitle>
            <AccordionItemBody>
              <span>
                When a CDP is listed for auction, you will lose the capability
                to draw additional DAI from the CDP. All other CDP management
                functions will be available through the auction contract.
              </span>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export default FAQ;
