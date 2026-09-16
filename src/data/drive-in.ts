export type DriveInStep = {
  line1: string;
  line2: string;
  body: string;
};

export type ArrivalRoute = {
  from: string;
  href: string;
  minutes: string;
  directions: string;
};

export function driveInStepTitle(step: DriveInStep): string {
  return `${step.line1} ${step.line2}`;
}

export const DRIVE_IN_STEPS: DriveInStep[] = [
  {
    line1: "Pull in at",
    line2: "28 St Columb Rd",
    body: "No booking needed. Park at the shopfront on St Columb, a quiet New Redruth street one turn off Voortrekker Road, then walk in with the car today.",
  },
  {
    line1: "Free three-point",
    line2: "battery test",
    body: "We load-test the battery, starter, and alternator on Midtronics equipment before anyone talks price. If the battery is healthy, we tell you first.",
  },
  {
    line1: "Price before",
    line2: "we fit it",
    body: "You see the fitted price for the right size and spec (standard, EFB, or AGM) at the counter. Scrap exchange is included, with no extras at fitment.",
  },
  {
    line1: "Fitted while",
    line2: "you wait",
    body: "Same-day fitment on the shop floor. Start-stop cars get BMS coding when needed. The warranty is registered at the counter before you leave today.",
  },
];

export const ARRIVAL_ROUTES: ArrivalRoute[] = [
  {
    from: "Voortrekker Road",
    href: "/local/new-redruth",
    minutes: "2–4 min",
    directions:
      "Stay on Voortrekker through New Redruth, then turn into St Columb Road. The shop is at number 28, so you are off the main-road traffic in under a minute.",
  },
  {
    from: "Alberton North",
    href: "/local/alberton-north",
    minutes: "6–10 min",
    directions:
      "Follow Voortrekker Road south toward New Redruth. Turn into St Columb Road and park at 28. Fastest drive-in from the northern commuter strip.",
  },
  {
    from: "Meyersdal",
    href: "/local/meyersdal",
    minutes: "10–15 min",
    directions:
      "Take Hennie Alberts / the Ring Road toward Alberton, then Voortrekker into New Redruth. One turn onto St Columb Road. Bring AGM/EFB cars in for coding at the counter.",
  },
  {
    from: "Brackenhurst",
    href: "/local/brackenhurst",
    minutes: "8–12 min",
    directions:
      "Hennie Alberts Street toward Voortrekker, then into New Redruth and St Columb Road. Street-front parking, with no hunting for a bay on the main road.",
  },
  {
    from: "Brackendowns",
    href: "/local/brackendowns",
    minutes: "10–14 min",
    directions:
      "Kritzinger toward Hennie Alberts, then Voortrekker into New Redruth. Turn onto St Columb Road for 28.",
  },
  {
    from: "Randhart",
    href: "/local/randhart",
    minutes: "6–10 min",
    directions:
      "Michelle Avenue onto Voortrekker Road, then one turn into St Columb. Shortest hop from the Randhart / Voortrekker grid.",
  },
  {
    from: "Alberante",
    href: "/local/alberante",
    minutes: "8–12 min",
    directions:
      "Drop toward Voortrekker / New Redruth and turn into St Columb Road. Walk-ins welcome for AGM sizes used on premium cars in Alberante.",
  },
  {
    from: "Albertsdal",
    href: "/local/albertsdal",
    minutes: "12–18 min",
    directions:
      "Head toward Alberton via Swartkoppies / Ring Road, then Voortrekker into New Redruth. St Columb Road is the last quiet turn before the shop.",
  },
];

export const PARKING_COPY =
  "Park on St Columb Road at the shopfront. It is a side street in New Redruth, so you are not competing with Voortrekker through-traffic for a bay.";

export const WHAT_TO_BRING = [
  "The car, if it still cranks. We test it in the yard",
  "The old battery if you already removed it. Scrap exchange is part of the fitted price",
  "The vehicle make, model, year, or the size stamped on the case (616, 619, 628, 646, 652, 658, 668)",
  "Nothing else. Card, cash, or EFT at the counter",
];
