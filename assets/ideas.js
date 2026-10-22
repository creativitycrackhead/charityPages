// Community program ideas for mosques and Islamic centers.
// Each idea is scored 1-5 on financial impact, ease (cost/time to start) and reach.
// Rank is computed from the scores in app.js, so you can edit scores here freely.
//
// tagline: one "Because..." line that pairs the need with the benefit.
// impact: what the program can do for a household (say "can", never promise).
// glance: rough estimates shown in the "at a glance" strip. costMax is used to
// count low-cost ideas on the home page (null = funded another way).
//
// Action levels: "simple", "moderate", "complex". Moderate and complex actions
// carry entry/exit criteria so a volunteer knows when to start and when it's done.

window.CATEGORIES = {
  food: "Food",
  money: "Money & zakat",
  jobs: "Jobs & learning",
  family: "Family & youth",
  sharing: "Sharing & repair",
  care: "Care & outreach",
};

window.IDEAS = [
  {
    id: "grocery-bulk-buying",
    title: "Halal grocery bulk-buying co-op",
    category: "food",
    scores: { financial: 4, ease: 4, reach: 5 },
    tagline: "Because every family deserves affordable halal food.",
    impact: "Families can save on halal meat and staples every month by buying together at case prices.",
    glance: { cost: "$0 upfront (orders are prepaid)", costMax: 0, volunteers: "4-7", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "Families pool money on a set schedule (for example every two weeks) to buy halal meat, rice, lentils, flour, oil, dates and produce at wholesale or case prices. Volunteers place the order, receive it at the masjid, split it into shares, and families pick up after Maghrib or Jumu'ah.",
    why: [
      "Halal meat is often one of the most expensive items in a Muslim household's budget, and buying whole or half animals or cases from a halal wholesaler can cut the price per pound a lot.",
      "Almost every household buys groceries, so nearly everyone in the jama'ah benefits.",
      "The same process scales up for Ramadan (dates, iftar staples) and Eid al-Adha, when many mosques already coordinate udhiyah/qurbani orders.",
    ],
    examples: [
      {
        name: "Bountiful Baskets Food Co-op",
        text: "A volunteer-run produce co-op started in Arizona in 2006. Participants contribute a fixed amount online, volunteers sort a bulk delivery into equal baskets at local pickup sites, and the model has spread to many states.",
        url: "https://www.bountifulbaskets.org/",
      },
      {
        name: "Azure Standard drop points",
        text: "A bulk food distributor whose customers order individually and collect everything from one truck at a host site (often a congregation or school) on a set day. A masjid can host a drop point.",
        url: "https://www.azurestandard.com/",
      },
      {
        name: "Islamic Relief USA qurbani distribution",
        text: "Islamic Relief USA partners with U.S. mosques and Islamic centers to distribute qurbani meat to families in need around Eid al-Adha. It shows how a mosque can act as a pickup and sorting hub for bulk halal meat.",
        url: "https://irusa.org/spectrum-news-1-worcester-islamic-center-islamic-relief-usa-join-forces-to-pack-20000-meals/",
      },
    ],
    resources: [
      "1 coordinator and 3-6 rotating volunteers (brothers and sisters) for pickup and sorting days",
      "Order and payment tool: Google Forms/Sheets plus a payment app or cash envelope, ideally through a separate masjid sub-account",
      "Suppliers: a halal meat wholesaler or local zabiha farm, a warehouse club, a restaurant-supply store, or a produce wholesaler",
      "Space: tables in the multipurpose hall; coolers or a fridge/freezer for meat",
      "Supplies: scale, food-safe bags and boxes, gloves, labels",
    ],
    actions: [
      { title: "Survey families", text: "Ask what they buy most, how much they'd spend per cycle, which halal certification they trust, and whether they'd volunteer. Announce it after Jumu'ah and in the masjid WhatsApp group.", level: "simple" },
      { title: "Pick a model", text: "Option A: a fixed \"share box\" (everyone gets the same box for a set price). Option B: à-la-carte orders. Start with A because it's much easier to run.", level: "simple" },
      { title: "Price out suppliers", text: "Compare 15-20 common items, including halal chicken, lamb and beef, against local prices.", level: "moderate", entry: "The survey is done and you have a list of the 20 most-wanted items.", exit: "A price sheet showing the savings per item, with at least one halal meat supplier (certification confirmed) and one dry-goods supplier lined up." },
      { title: "Set rules", text: "Order deadline, pay-before-order policy, pickup window, what happens to unclaimed shares (for example, donate to the masjid pantry), and food-safety basics: keep meat cold and don't repackage raw meat.", level: "moderate", entry: "Model and suppliers chosen.", exit: "A one-page rules sheet approved by the masjid board." },
      { title: "Run a pilot cycle with 10-15 households", text: "Keep the first round small so mistakes are cheap.", level: "complex", entry: "Rules approved, payments collected, volunteers scheduled, and a cold-storage plan in place.", exit: "Every share distributed, the books balance to the cent, families report their savings, and you have a list of lessons learned." },
      { title: "Scale up", text: "Open to the whole jama'ah (and neighbors), add à-la-carte items, and run a special Ramadan and Eid cycle.", level: "simple" },
    ],
    watchouts: [
      "Money handling: two people count, and receipts are posted to a shared sheet the board can see.",
      "Don't carry inventory at first. Only buy what's been prepaid.",
      "Confirm halal certification with the supplier in writing, and let the imam weigh in if families disagree on standards.",
    ],
  },

  {
    id: "zakat-qard-hasan-fund",
    title: "Local zakat, sadaqah & qard hasan fund",
    category: "money",
    scores: { financial: 5, ease: 3, reach: 3 },
    tagline: "Because zakat can change lives on your own street.",
    impact: "A single grant or interest-free loan can keep a family housed and out of debt.",
    glance: { cost: "Under $100 to set up", costMax: 100, volunteers: "3-5", launch: "1-2 months", launchWeeks: 8 },
    summary:
      "The masjid sets up a transparent local fund so that part of the community's zakat and sadaqah goes to eligible families nearby, for rent, utility bills, car repairs or emergencies. A second pot offers qard hasan: small interest-free loans that members repay, so the money is lent again and again.",
    why: [
      "Many Muslims pay zakat every year, often to overseas appeals, while families in their own masjid quietly struggle with rent or bills.",
      "A single grant or interest-free loan can keep a family out of payday loans, eviction or debt with interest (riba).",
      "It builds trust: donors see their zakat reach real people locally, and recipients are helped with dignity and privacy.",
    ],
    examples: [
      {
        name: "National Zakat Foundation (UK)",
        text: "A UK charity that collects zakat and distributes it locally to eligible Muslims in hardship, with caseworkers who assess each application. Its model shows how to run local zakat distribution with clear eligibility rules.",
        url: "https://nzf.org.uk/",
      },
      {
        name: "Zakat Foundation of America",
        text: "A U.S. charity that, alongside its international work, runs U.S. programs that help families through emergencies.",
        url: "https://www.zakat.org/u-s-programs",
      },
      {
        name: "East London Mosque qard hasanah appeal",
        text: "East London Mosque has raised large sums as qard hasanah (interest-free loans from its own community) to fund building projects, showing how willing a jama'ah can be to lend interest-free when the process is transparent.",
        url: "https://www.eastlondonmosque.org.uk/news/fundraising-appeal-raises-over-11m-qard-hasanah",
      },
    ],
    resources: [
      "A small committee of 3-5 trusted members, including the imam or a scholar to advise on zakat eligibility",
      "A separate, restricted bank account (or sub-account) for zakat, kept apart from general masjid funds",
      "A confidential application form, a needs-assessment checklist, and a written zakat policy",
      "A loan agreement template for qard hasan, with a simple repayment schedule",
      "A zakat calculator to share with donors (NZF and other zakat charities publish free ones)",
    ],
    actions: [
      { title: "Get scholarly guidance", text: "Ask the imam or a trusted scholar to confirm which of the eight zakat categories you'll serve locally, and whether you'll pay bills directly or give cash.", level: "simple" },
      { title: "Write the policy", text: "Who's eligible, how to apply, the maximum grant, how decisions are made, how privacy is protected, and how qard hasan loans are approved and repaid.", level: "moderate", entry: "Scholarly guidance received and the board supports the fund.", exit: "A written policy approved by the board, with the zakat account opened." },
      { title: "Launch with a Ramadan appeal", text: "Ramadan is when most Muslims pay zakat. Ask donors to designate part of it for the local fund.", level: "simple" },
      { title: "Process applications", text: "Two committee members review each case; pay landlords, utilities or garages directly where possible.", level: "moderate", entry: "Fund has money, application form is live, and committee members have signed confidentiality agreements.", exit: "First cases decided within an agreed time (for example 7 days), with every payment recorded." },
      { title: "Report back", text: "Publish anonymous totals each year (families helped, amount given, loans repaid) so donors keep trusting the fund.", level: "simple" },
    ],
    watchouts: [
      "Never reveal who received help. Keep names off group chats and announcements.",
      "Keep zakat money strictly separate from sadaqah and general funds, and spend it only on eligible recipients.",
      "Start qard hasan loans small and expect some not to be repaid. Decide in advance how you'll handle that with kindness.",
    ],
  },

  {
    id: "benefits-navigation",
    title: "Benefits & assistance help desk",
    category: "money",
    scores: { financial: 5, ease: 4, reach: 3 },
    tagline: "Because help that goes unclaimed helps no one.",
    impact: "One successful application can be worth hundreds to thousands of dollars a year to a household.",
    glance: { cost: "Under $100", costMax: 100, volunteers: "2-4", launch: "3-4 weeks", launchWeeks: 4 },
    summary:
      "Trained volunteers help members and neighbors find and apply for programs they already qualify for but aren't using: food assistance (SNAP, WIC), utility bill help (LIHEAP), health coverage (Medicaid, CHIP, Marketplace subsidies), discounted phone/internet (Lifeline), and prescription assistance. Volunteers who speak Arabic, Urdu, Somali, Bengali or other community languages make a big difference.",
    why: [
      "Large amounts of benefit money go unclaimed because forms are confusing, people feel shame asking, or newer immigrants simply don't know a program exists.",
      "One successful application can be worth hundreds to thousands of dollars a year to a household.",
      "Volunteers need patience and organization, not expertise. They help people navigate; they don't make eligibility decisions.",
    ],
    examples: [
      {
        name: "ICNA Relief",
        text: "A U.S. Muslim relief organization with chapters around the country that run food pantries, transitional housing and family services, and connect people to local assistance.",
        url: "https://www.icnarelief.org/",
      },
      {
        name: "211",
        text: "The United Way-supported phone and web directory for local assistance programs. A good starting list for any help desk.",
        url: "https://www.211.org/",
      },
      {
        name: "UMMA Community Clinic",
        text: "A free clinic in South Los Angeles started in 1996 by Muslim UCLA students and graduates to serve uninsured neighbors of every background. It shows how a small Muslim-led volunteer service can grow into a lasting community institution.",
        url: "https://en.wikipedia.org/wiki/UMMA_Community_Clinic",
      },
    ],
    resources: [
      "2-4 volunteers comfortable with computers and paperwork, ideally speaking the community's main languages",
      "A laptop, printer/scanner, and a private table or room (a separate space for sisters if requested)",
      "Reference lists: 211.org, USA.gov benefit finder, your state benefits portal, your utility's assistance page, HealthCare.gov's \"find local help\"",
      "Intake form and a privacy/consent statement",
    ],
    actions: [
      { title: "Build a local resource sheet", text: "One page per program: who qualifies, documents needed, link, and phone number. Translate the most-used ones.", level: "moderate", entry: "A volunteer lead has been identified.", exit: "Sheets cover the 8-10 most relevant programs and have been checked against each official site." },
      { title: "Train volunteers", text: "A 2-hour session on the resource sheets, privacy, and what not to do (no legal advice; never keep copies of IDs or Social Security numbers). Many state agencies and food banks offer free navigator training.", level: "moderate", entry: "Resource sheets are finished.", exit: "Each volunteer has done one mock session and signed a confidentiality agreement." },
      { title: "Hold regular hours", text: "Weekly or twice a month, for example after Jumu'ah or on a weekend morning, by appointment and walk-in.", level: "simple" },
      { title: "Follow up", text: "Check in after 30 days to see whether the application went through. Track outcomes anonymously.", level: "simple" },
    ],
    watchouts: [
      "Never store sensitive documents. The applicant enters their own data, and the volunteer guides them.",
      "Refer complex cases (disability appeals, immigration questions) to legal aid or a Muslim legal clinic.",
    ],
  },

  {
    id: "resume-job-essay-help",
    title: "Resume, job application & essay help",
    category: "jobs",
    scores: { financial: 4, ease: 5, reach: 3 },
    tagline: "Because a better job changes everything at home.",
    impact: "A new or better-paid job is often the biggest financial change a family can make.",
    glance: { cost: "$0", costMax: 0, volunteers: "3-6", launch: "2 weeks", launchWeeks: 2 },
    summary:
      "Free drop-in sessions where volunteers help people write resumes and cover letters, fill out online job applications, prepare for interviews, and write school or scholarship essays. Professionals in the jama'ah share how hiring works in their field.",
    why: [
      "Landing a job, or a better-paying one, is often the biggest financial change a household can make.",
      "Many immigrants in our communities have degrees and experience that don't come across well on a U.S. resume. A little coaching helps a lot.",
      "Most mosques already have doctors, engineers, managers, teachers and business owners, so the expertise is already in the musalla.",
    ],
    examples: [
      {
        name: "IMAN (Inner-City Muslim Action Network), Chicago",
        text: "A Muslim community organization founded in 1997 whose Green ReEntry program trains formerly incarcerated men in construction and green building skills while they renovate homes on Chicago's South Side.",
        url: "https://www.imancentral.org/",
      },
      {
        name: "Public library resume clinics",
        text: "Libraries nationwide run free volunteer-staffed resume clinics. A masjid can run the same model in its hall or classroom.",
        url: "https://www.careeronestop.org/",
      },
      {
        name: "American Job Centers",
        text: "The U.S. Department of Labor's free career centers, which partner with community groups and accept referrals.",
        url: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx",
      },
    ],
    resources: [
      "3-6 volunteers: people with hiring experience, managers, teachers, and strong writers",
      "Laptops, printer, Wi-Fi, a quiet room",
      "Free tools: CareerOneStop.org resume and interview guides, Google Docs resume templates, the local American Job Center, college scholarship offices, and Muslim scholarship lists",
      "Sign-up sheet or simple booking link",
    ],
    actions: [
      { title: "Recruit volunteers and agree on a format", text: "For example, a monthly Saturday drop-in after Dhuhr plus by-appointment help.", level: "simple" },
      { title: "Build a resource kit", text: "2-3 clean resume templates, a cover letter template, common interview questions, a scholarship essay checklist, and a list of local employers that are hiring.", level: "simple" },
      { title: "Run a 1-hour volunteer orientation", text: "Encouragement over criticism, the job seeker writes while volunteers coach, and privacy.", level: "simple" },
      { title: "Launch the clinic", text: "Announce it after Jumu'ah, in the masjid newsletter and WhatsApp groups, and at the local library.", level: "simple" },
      { title: "Add mock interviews and a job board", text: "Members post openings at their workplaces, and volunteers run 20-minute practice interviews.", level: "moderate", entry: "The clinic has run at least 3 sessions with steady attendance.", exit: "At least 3 interviewers are available, and a job board page or newsletter section is live." },
    ],
    watchouts: [
      "For essays, coach the student but don't write it for them. Honesty (amanah) matters.",
      "Track outcomes (interviews, jobs gained) to show impact and recruit more volunteers.",
    ],
  },

  {
    id: "financial-literacy",
    title: "Halal budgeting & financial literacy class",
    category: "money",
    scores: { financial: 3, ease: 5, reach: 4 },
    tagline: "Because a plan for money brings peace of mind.",
    impact: "Families can build an emergency fund, avoid payday loans and calculate zakat with confidence.",
    glance: { cost: "$0 with free curricula", costMax: 0, volunteers: "1-3", launch: "3-4 weeks", launchWeeks: 4 },
    summary:
      "A short course (6-8 weekly sessions) on budgeting, getting out of debt, building an emergency fund, avoiding payday loans, understanding credit, calculating zakat, and halal options for saving, home buying and retirement.",
    why: [
      "Helps people keep more of what they already earn, with savings that grow for years.",
      "Many Muslims avoid interest-based products but aren't sure what halal alternatives exist, so they end up with no plan at all. A class fills that gap.",
      "Free, high-quality curricula already exist, so volunteers facilitate rather than invent.",
    ],
    examples: [
      {
        name: "FDIC Money Smart",
        text: "A free U.S. government curriculum that community groups use to teach budgeting, credit and banking basics.",
        url: "https://www.fdic.gov/consumer-resource-center/money-smart",
      },
      {
        name: "Islamic Finance Guru",
        text: "A UK-based platform that publishes free articles, guides and podcasts on halal personal finance, investing and zakat. Useful material for the Islamic-finance sessions of a class.",
        url: "https://www.islamicfinanceguru.com/",
      },
      {
        name: "National Zakat Foundation zakat guides",
        text: "NZF publishes plain-language guides and a calculator explaining how to work out zakat on savings, gold and investments, which works well as a class handout.",
        url: "https://nzf.org.uk/",
      },
    ],
    resources: [
      "1-2 facilitators (an accountant or banker helps, but isn't required), plus the imam for a session on zakat and riba",
      "Curriculum: FDIC Money Smart (free) plus Islamic-finance sessions you add",
      "Room, screen or projector, printed budget worksheets",
      "Optional: childcare during class (see the childcare co-op idea)",
    ],
    actions: [
      { title: "Pick a curriculum", text: "Preview it with the imam and the board, and decide which halal-finance topics to add.", level: "simple" },
      { title: "Schedule and promote", text: "A fixed start date and length, plus a free kickoff session. Avoid Ramadan nights.", level: "simple" },
      { title: "Run the course", text: "Track attendance and simple before/after measures (has a written budget? has an emergency fund? knows how to calculate zakat?).", level: "moderate", entry: "Facilitator prepared, room booked, at least 8 people signed up.", exit: "Course completed and participants fill out a short survey on what changed." },
      { title: "Offer one-on-one coaching", text: "For graduates who want help with their own budget.", level: "moderate", entry: "At least 2 volunteers are comfortable reviewing a budget and have signed a confidentiality agreement.", exit: "A coaching request form exists, coaches are matched, and each pair has met at least once." },
    ],
    watchouts: [
      "Keep it judgment-free. Money and debt are embarrassing topics for many people.",
      "Volunteers give general education, not investment, legal or fatwa-level advice. Refer specific rulings to a scholar.",
    ],
  },

  {
    id: "clothing-swap",
    title: "Eid clothing & kids' gear swap",
    category: "sharing",
    scores: { financial: 3, ease: 5, reach: 4 },
    tagline: "Because every child should feel new on Eid.",
    impact: "Families can dress growing kids for Eid and school for free.",
    glance: { cost: "$0", costMax: 0, volunteers: "5-9", launch: "2-3 weeks", launchWeeks: 3 },
    summary:
      "A regular swap (before each Eid, back-to-school, and winter) where families bring clean, gently used clothing, modest wear, abayas, thobes, kufis, shoes, and kids' gear, and take what they need for free. Leftovers go to a shelter, refugee resettlement office or thrift partner.",
    why: [
      "Kids outgrow clothes every few months, and new Eid outfits for every child add up fast.",
      "There's almost no cost: the masjid supplies tables and volunteers, and families supply the goods.",
      "Everyone gives and everyone takes, so there's no stigma, and it's a natural way to welcome refugee and newcomer families.",
    ],
    examples: [
      {
        name: "Islamic Relief USA \"Day of Dignity\"",
        text: "A yearly Islamic Relief USA program where local mosques and Muslim volunteers distribute clothing, hygiene kits, food and other essentials to neighbors in need in cities across the U.S.",
        url: "https://irusa.org/?p=5080",
      },
      {
        name: "Buy Nothing Project",
        text: "Started in 2013 on Bainbridge Island, Washington, as a local gift-economy group. It has grown into thousands of neighborhood groups where people give items away for free.",
        url: "https://buynothingproject.org/",
      },
      {
        name: "Muslim Food Bank & Community Services Society (B.C., Canada)",
        text: "A Muslim-led charity in British Columbia that, besides food hampers, supports newcomer and low-income families with clothing and household items.",
        url: "https://muslimfoodbank.com/",
      },
    ],
    resources: [
      "1 coordinator and 4-8 volunteers on swap day (sorting, setup, cleanup)",
      "Hall, folding tables, clothing racks or labeled bins by size and category",
      "Signs, size labels, bags",
      "A screened-off area for trying on abayas and modest wear, if space allows",
      "A donation partner for leftovers",
    ],
    actions: [
      { title: "Set the rules", text: "Clean and in good condition only; no undergarments; no car seats or cribs (recalls and expiration dates); limits per family if supply is tight.", level: "simple" },
      { title: "Pick a date and collection window", text: "About two weeks before Eid works well. Collect donations the week before so volunteers can sort.", level: "simple" },
      { title: "Sort and set up", text: "Group by category and size, and set aside anything unusable.", level: "moderate", entry: "Collection window has closed, volunteers are scheduled, and tables and racks are in place.", exit: "Every item is sorted, unusable items are removed, and signs are up." },
      { title: "Run the swap", text: "Open to the jama'ah first, then neighbors for the last hour.", level: "simple" },
      { title: "Donate leftovers the same day", text: "So nothing has to be stored.", level: "simple" },
      { title: "Make it recurring", text: "Before Eid al-Fitr, Eid al-Adha, back-to-school and winter.", level: "simple" },
    ],
    watchouts: [
      "Don't let it become a storage problem. Set a firm pickup for leftovers.",
      "Make it easy for people to \"just take\" without having to bring something.",
    ],
  },

  {
    id: "free-tax-prep",
    title: "Free tax preparation (VITA site)",
    category: "money",
    scores: { financial: 4, ease: 3, reach: 4 },
    tagline: "Because families should keep the credits they've earned.",
    impact: "Free filing saves a few hundred dollars in fees, and credits like the EITC can be worth thousands.",
    glance: { cost: "$0 (the partner lends equipment)", costMax: 0, volunteers: "4-7", launch: "3-4 months (start in the fall)", launchWeeks: 16 },
    summary:
      "The masjid hosts a free tax-filing site during tax season through the IRS Volunteer Income Tax Assistance (VITA) program. IRS-certified volunteers prepare and e-file returns for low- and moderate-income households, people with disabilities, and limited-English speakers.",
    why: [
      "Paid preparers commonly charge a few hundred dollars per return. VITA is free.",
      "Volunteers make sure people claim credits they often miss, especially the Earned Income Tax Credit and Child Tax Credit, which can be worth thousands.",
      "The IRS provides training, software and quality review, so volunteers don't need to be tax experts. Tax season is also a natural time to remind people to calculate zakat.",
    ],
    examples: [
      {
        name: "IRS VITA program",
        text: "Running since 1969. Thousands of sites operate each year at congregations, libraries and community centers, staffed by IRS-certified volunteers.",
        url: "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
      },
      {
        name: "AARP Foundation Tax-Aide",
        text: "A free, volunteer-run tax-prep program with a focus on older adults. Sites are often hosted by faith and community centers.",
        url: "https://www.aarp.org/money/taxes/aarp_taxaide/",
      },
      {
        name: "United Way VITA coalitions",
        text: "Many local United Ways coordinate VITA coalitions and help new host sites get set up with volunteers and equipment.",
        url: "https://www.unitedway.org/",
      },
    ],
    resources: [
      "A site coordinator and 3-6 volunteers who pass the free IRS certification (online, through Link & Learn Taxes)",
      "A partner: the local VITA coalition, United Way, or AARP Tax-Aide, which usually supplies laptops and software",
      "A private room, reliable Wi-Fi, and a printer",
      "Intake forms (IRS Form 13614-C) and a checklist of documents for clients to bring",
    ],
    actions: [
      { title: "Contact your local VITA coalition", text: "Search \"VITA partner\" on IRS.gov or call your United Way. Do this in early fall, since sites are set up before January.", level: "simple" },
      { title: "Recruit and certify volunteers", text: "Accountants, students and retirees in the jama'ah are great candidates.", level: "moderate", entry: "Partner has agreed to sponsor the site.", exit: "Each preparer has passed the required certification and signed the Volunteer Standards of Conduct." },
      { title: "Set up the site", text: "Hours, appointment system, privacy setup, and a document checklist.", level: "moderate", entry: "Volunteers certified, equipment arranged with the partner.", exit: "A test run of intake, preparation, quality review and e-file has worked end to end." },
      { title: "Promote", text: "After Jumu'ah, in the newsletter, and with local schools and food pantries from January on.", level: "simple" },
      { title: "Run the season", text: "Late January to mid-April. Track returns filed and credits claimed. Plan around Ramadan when it falls in spring.", level: "moderate" },
    ],
    watchouts: [
      "Taxpayer data is sensitive. Follow the partner's security rules exactly.",
      "This is a seasonal commitment. Recruit enough volunteers so no one burns out.",
    ],
  },

  {
    id: "childcare-coop",
    title: "Babysitting co-op & halaqa childcare",
    category: "family",
    scores: { financial: 4, ease: 4, reach: 3 },
    tagline: "Because parents deserve time to pray, learn and work.",
    impact: "Parents can go to classes, interviews and appointments without paying for a sitter.",
    glance: { cost: "$0", costMax: 0, volunteers: "6-12 families", launch: "2-4 weeks", launchWeeks: 4 },
    summary:
      "Member families trade babysitting with each other instead of paying for it. Each family earns points when they watch someone else's kids and spends points when someone watches theirs. The masjid can also run supervised childcare during halaqas, classes and Taraweeh so parents can attend.",
    why: [
      "Babysitting often costs $15-20 or more an hour. A co-op makes appointments, job interviews and evenings out affordable.",
      "It gives parents, especially young mothers, a trusted network of families from their own masjid.",
      "Childcare during programs is often what decides whether mothers can attend classes at all.",
    ],
    examples: [
      {
        name: "Capitol Hill Babysitting Co-op",
        text: "A Washington, D.C. co-op of families who traded babysitting using scrip coupons. It became famous after a 1977 economics article about it and was later popularized by Paul Krugman.",
        url: "https://en.wikipedia.org/wiki/Capitol_Hill_Babysitting_Co-op",
      },
      {
        name: "Ramadan Taraweeh kids' programs",
        text: "Many mosques run supervised kids' rooms or youth programs during Taraweeh so parents can pray. It's the same model as a church \"Parents' Night Out\", just tied to the prayer schedule.",
      },
    ],
    resources: [
      "A coordinator to track points and welcome new families",
      "A tracking tool: a shared Google Sheet or a free sitting-co-op app",
      "A short family agreement (allergies, emergency contacts, house rules, screen time)",
      "For on-site childcare: background-checked volunteers and a written child-safety policy",
    ],
    actions: [
      { title: "Gather 6-12 interested families", text: "Co-ops work best when families already know each other, for example from weekend school.", level: "simple" },
      { title: "Write simple rules", text: "Points per hour, starter points for new families, cancellation etiquette, and sick-child policy.", level: "moderate", entry: "At least 6 families have committed.", exit: "A one-page agreement that every family signs." },
      { title: "Set up tracking and run a 2-month trial", text: "Review what worked at the end.", level: "simple" },
      { title: "Optional: launch on-site childcare during programs", text: "Start with one weekly halaqa or class.", level: "complex", entry: "Child-safety policy written and approved; volunteers background-checked; two-adult rule and check-in/check-out process in place.", exit: "First session held with signed registration forms, every child checked out to an authorized adult, and feedback gathered." },
    ],
    watchouts: [
      "Follow the masjid's child-protection policy and check insurance for anything held on masjid property.",
      "Keep the points balanced. Families who only take eventually strain the group.",
    ],
  },

  {
    id: "community-iftar",
    title: "Community iftar & meal share",
    category: "food",
    scores: { financial: 2, ease: 4, reach: 5 },
    tagline: "Because no one should break their fast alone.",
    impact: "A free nightly iftar can ease a family's food budget through Ramadan and welcome people who'd never ask for help.",
    glance: { cost: "Covered by sponsors", costMax: null, volunteers: "8-15", launch: "4-6 weeks before Ramadan", launchWeeks: 6 },
    summary:
      "Turn Ramadan iftars into a year-round meal program: open iftars that welcome students, singles, reverts, neighbors and families on tight budgets, plus a monthly community dinner and a volunteer team that cooks and delivers meals to the elderly, new mothers and families in crisis.",
    why: [
      "A free nightly iftar can save a family real money over 30 days, and it reaches people who would never ask for help.",
      "It's something nearly every masjid already does, so the skills, kitchens and volunteers already exist.",
      "Opening iftar to neighbors of all faiths builds understanding and good relations with the wider community.",
    ],
    examples: [
      {
        name: "Ramadan Tent Project \"Open Iftar\" (UK)",
        text: "Started by students at SOAS in London in 2013, Open Iftar invites people of all backgrounds to break the fast together and has been held at landmark venues across the UK.",
        url: "https://www.soas.ac.uk/about/news/open-iftar-returns-where-it-all-began-soas",
      },
      {
        name: "Muslim Food Bank & Community Services Society (B.C., Canada)",
        text: "Besides its food bank, this Muslim-led charity runs programs to feed people experiencing homelessness, a year-round version of the iftar spirit.",
        url: "https://muslimfoodbank.com/feeding-the-homeless",
      },
      {
        name: "Mosque meal trains",
        text: "Many mosques organize meal trains through WhatsApp or free tools like MealTrain for families after a birth, illness or death.",
        url: "https://www.mealtrain.com/",
      },
    ],
    resources: [
      "An iftar coordinator, a kitchen lead with food-safety knowledge, and volunteer cooks and servers",
      "Sponsors: families often sponsor a night's iftar as sadaqah",
      "Kitchen or caterer, serving supplies, and reusable or compostable plates",
      "A sign-up tool for sponsors and a meal-train list for deliveries",
    ],
    actions: [
      { title: "Open up your Ramadan iftar", text: "Announce clearly that everyone is welcome, and invite local students, neighbors and other congregations.", level: "simple" },
      { title: "Set up night sponsorships", text: "A shared calendar where families or businesses sponsor a night.", level: "simple" },
      { title: "Start a meal-train team", text: "A list of volunteer cooks and drivers who can deliver meals within 48 hours of a request.", level: "moderate", entry: "At least 8 volunteers have signed up and the imam or a committee member can receive requests confidentially.", exit: "First 3 families served, with a simple process for requests and sign-ups." },
      { title: "Add a monthly community dinner", text: "Keep the Ramadan momentum going, for example on the first Saturday of each month.", level: "moderate", entry: "Ramadan iftar ran smoothly and volunteers want to continue.", exit: "Three monthly dinners held with steady attendance and a sponsor list for the next three." },
    ],
    watchouts: [
      "Follow local food-safety rules, especially for food cooked at home and served in the masjid.",
      "Label common allergens and have vegetarian options for guests.",
    ],
  },

  {
    id: "skills-exchange",
    title: "Skills exchange / time bank",
    category: "sharing",
    scores: { financial: 3, ease: 3, reach: 3 },
    tagline: "Because everyone has something to give.",
    impact: "Members can trade an hour of what they know for an hour of what they need.",
    glance: { cost: "Under $100", costMax: 100, volunteers: "1-2 coordinators", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "Members offer skills and services to each other (rides, yard work, cooking, simple repairs, Qur'an or Arabic lessons, English practice, computer help) and earn time credits for every hour given. One hour of help always equals one credit, whatever the skill.",
    why: [
      "People get help they would otherwise pay for, and everyone's time is valued equally.",
      "It draws in members who have time but not money, including retirees and students.",
      "It strengthens ties between generations and between the different ethnic communities that share one masjid.",
    ],
    examples: [
      {
        name: "TimeBanks USA",
        text: "Founded by law professor Edgar Cahn, who developed the time-banking idea in the 1980s. It has helped start hundreds of community time banks.",
        url: "https://timebanks.org/",
      },
      {
        name: "hOurworld",
        text: "A nonprofit that provides free time-banking software and support to hundreds of local time banks.",
        url: "https://hourworld.org/",
      },
      {
        name: "Fureai Kippu (Japan)",
        text: "A system where volunteers earn credits for caring for older adults, which they can save for their own care later or transfer to relatives.",
        url: "https://en.wikipedia.org/wiki/Fureai_kippu",
      },
    ],
    resources: [
      "A coordinator who matches requests and checks in with members",
      "Time-tracking software (hOurworld is free) or a shared spreadsheet",
      "A sign-up form listing skills offered and help needed",
      "A liability waiver and guidelines on what's in and out of scope",
    ],
    actions: [
      { title: "Survey skills and needs", text: "A short form shared after Jumu'ah and in WhatsApp groups.", level: "simple" },
      { title: "Choose a platform and set rules", text: "What counts, how credits are logged, and safety rules (no unsupervised work with children, no licensed trades like electrical, appropriate arrangements between non-mahram members).", level: "moderate", entry: "Survey shows at least 20 members willing to offer something.", exit: "Platform set up, rules and waiver approved by the board." },
      { title: "Launch with a kickoff event", text: "Members sign up and post their first offers on the spot.", level: "simple" },
      { title: "Seed early exchanges", text: "The coordinator actively matches the first 10-20 requests so people see it working.", level: "moderate", entry: "At least 15 members have registered.", exit: "At least 10 completed exchanges logged and positive feedback collected." },
    ],
    watchouts: [
      "Time banks fade without an active coordinator. Plan for that person's time, even if they volunteer.",
      "Check with the masjid's insurer about liability for member-to-member services.",
    ],
  },

  {
    id: "repair-cafe",
    title: "Repair café & car-care clinic",
    category: "sharing",
    scores: { financial: 3, ease: 3, reach: 3 },
    tagline: "Because fixing beats replacing.",
    impact: "Fixing a lamp, bike or coat can save the cost of a new one and keep it out of the landfill.",
    glance: { cost: "Under $200 in tools", costMax: 200, volunteers: "3-8", launch: "3-4 weeks", launchWeeks: 4 },
    summary:
      "A free monthly event where volunteers with handy skills help people fix broken things together: small appliances, lamps, clothing, bikes, furniture and electronics. A car-care version teaches basics like checking fluids, changing wiper blades and tire pressure.",
    why: [
      "Fixing instead of replacing saves money, and basic car maintenance prevents expensive breakdowns.",
      "Most mosques have engineers, mechanics and retirees who enjoy sharing these skills.",
      "It avoids waste (israf), which Islam discourages, and teaches people to do it themselves next time.",
    ],
    examples: [
      {
        name: "Repair Café",
        text: "Started by Martine Postma in Amsterdam in 2009. The Repair Café Foundation now supports thousands of volunteer-run repair cafés worldwide.",
        url: "https://www.repaircafe.org/en/",
      },
      {
        name: "Brent Repair Café at Wembley Central Mosque (London)",
        text: "A repair event held at Wembley Central Mosque and listed by The Restart Project, which helps community groups run repair events.",
        url: "https://therestartproject.org/groups/restart-paid-events/parties/18924",
      },
      {
        name: "Islington Repair Café at Finsbury Park Mosque (London)",
        text: "Another community repair event hosted in a mosque and listed by The Restart Project.",
        url: "https://therestartproject.org/groups/islington-repair-cafe/parties/5221",
      },
    ],
    resources: [
      "3-8 \"fixer\" volunteers (sewing, small electronics, woodworking, bikes, cars)",
      "Basic tool kits, a sewing machine, extension cords, safety glasses",
      "For car care: parking lot space, jacks and stands, drain pans, and a plan to dispose of used oil (auto parts stores often accept it)",
      "Intake and waiver form; the Repair Café Foundation offers a starter kit",
    ],
    actions: [
      { title: "Recruit fixers", text: "Find out what each volunteer can repair.", level: "simple" },
      { title: "Get starter materials", text: "Repair Café's guide, waivers and sign-in sheets.", level: "simple" },
      { title: "Plan the first event", text: "Choose categories based on available fixers, and set up stations.", level: "moderate", entry: "At least 3 fixers confirmed, date and space booked.", exit: "Stations, tools, waivers and sign-in process ready." },
      { title: "Run the event", text: "Log every item fixed so you can share the results.", level: "simple" },
      { title: "Add a car-care clinic", text: "Start with fluids, tires and wipers.", level: "complex", entry: "At least 2 volunteers with mechanical experience, liability coverage checked with the insurer, and a disposal plan for oil and fluids.", exit: "First clinic held safely, waivers signed, fluids disposed of properly, and cars serviced are logged." },
    ],
    watchouts: [
      "No gas appliances, microwaves (high-voltage capacitors), or safety-critical car work like brakes unless done by a qualified mechanic.",
      "Fixers coach; owners do as much of the work as they can.",
    ],
  },

  {
    id: "tutoring",
    title: "Tutoring & homework club",
    category: "family",
    scores: { financial: 2, ease: 4, reach: 3 },
    tagline: "Because every child deserves a fair shot at school.",
    impact: "Free homework help can keep kids on track without the cost of private tutoring.",
    glance: { cost: "Under $100 in supplies", costMax: 100, volunteers: "4-10", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "A weekly after-school homework club at the masjid where volunteers help kids with reading, math and homework, often right before or after Islamic school. It can also include adult tutoring like English as a Second Language (ESL), citizenship test prep, or GED prep.",
    why: [
      "Private tutoring is expensive. Free help keeps kids from falling behind.",
      "Better grades open doors to scholarships, better schools and better jobs.",
      "Volunteers just need patience and school-level skills. College students and retirees in the jama'ah make great tutors.",
    ],
    examples: [
      {
        name: "Assunnah Muslims Association homework club (Canada)",
        text: "A mosque-run homework club for students, listed on the community's events platform. One of many mosque homework clubs in North America and the UK.",
        url: "https://events.mymasjid.ca/e/222/homework-club-2021-2022",
      },
      {
        name: "Reading Partners",
        text: "A national nonprofit that uses community volunteers to tutor elementary students in reading with a structured curriculum.",
        url: "https://readingpartners.org/",
      },
      {
        name: "Khan Academy",
        text: "Free online lessons and practice in math, reading and science that tutors can use with students.",
        url: "https://www.khanacademy.org/",
      },
    ],
    resources: [
      "4-10 volunteer tutors, background-checked",
      "A classroom with tables, Wi-Fi, a few laptops or tablets, and school supplies",
      "Free resources: Khan Academy, library programs, and materials from local schools",
      "Snacks (kids learn better when they're not hungry)",
    ],
    actions: [
      { title: "Talk to a nearby school", text: "Ask what students need most and whether they'll refer families.", level: "simple" },
      { title: "Recruit and screen tutors", text: "Follow the masjid's child-safety policy.", level: "moderate", entry: "Child-safety policy and background-check process confirmed with the board.", exit: "At least 4 tutors cleared and oriented." },
      { title: "Set a schedule", text: "For example Tuesdays and Thursdays from 4:00 to 5:30 pm, adjusted around Asr and Maghrib. Add a sign-in/sign-out process.", level: "simple" },
      { title: "Launch and track progress", text: "Parent check-ins and, where possible, grades or reading levels.", level: "moderate" },
      { title: "Expand to adults", text: "ESL or citizenship test prep if there's demand.", level: "moderate" },
    ],
    watchouts: [
      "Always have at least two adults present, and release children only to authorized adults.",
      "Help kids understand the work. Don't do their homework for them.",
    ],
  },

  {
    id: "masjid-pantry",
    title: "Masjid pantry & halal food shelf",
    category: "food",
    scores: { financial: 2, ease: 5, reach: 2 },
    tagline: "Because hunger doesn't keep office hours.",
    impact: "Neighbors can get halal food any time of day, no questions asked.",
    glance: { cost: "Under $100", costMax: 100, volunteers: "2-4", launch: "1-2 weeks", launchWeeks: 2 },
    summary:
      "A small weatherproof cabinet outside the masjid that anyone can stock with non-perishable halal food and basics, and anyone can take from, any time, no questions asked. It can grow into an indoor halal food pantry, since many regular food banks can't offer halal meat.",
    why: [
      "It meets urgent needs right away, at any hour, with no paperwork or shame. Feeding the hungry is one of the most praised deeds in Islam.",
      "It costs very little: one cabinet and members' sadaqah.",
      "Muslim families often can't use much of what general food banks give out, so a halal shelf fills a real gap.",
    ],
    examples: [
      {
        name: "Sufra NW London",
        text: "A community food bank and kitchen in Brent, London, founded by Mohammed Mamdani. It serves people of all faiths and none.",
        url: "https://en.wikipedia.org/wiki/Sufra_(charity)",
      },
      {
        name: "Muslim Food Bank & Community Services Society (B.C., Canada)",
        text: "A Muslim-led charity providing halal food hampers to low-income families and individuals in the Vancouver area.",
        url: "https://muslimfoodbank.com/",
      },
      {
        name: "Little Free Pantry",
        text: "Started by Jessica McClard in Fayetteville, Arkansas, in 2016, inspired by Little Free Library book boxes. Thousands of these pantries now exist, many at places of worship.",
        url: "https://www.littlefreepantry.org/",
      },
    ],
    resources: [
      "A weatherproof cabinet with a door (build one for under $100, or buy a kit)",
      "A visible, well-lit spot near the sidewalk, approved by the masjid board",
      "2-4 volunteers to check and restock it a few times a week",
      "A sign: \"Take what you need, give what you can\", in English and community languages, with a list of good items to donate",
    ],
    actions: [
      { title: "Get approval and pick a location", text: "Visible, well-lit and easy to reach.", level: "simple" },
      { title: "Build or buy the pantry and install it", text: "A youth group build day is a good project.", level: "moderate", entry: "Location approved, materials bought.", exit: "Pantry installed securely, sealed against weather and pests, with the sign in place." },
      { title: "Set up restocking", text: "A schedule and a donation bin inside the masjid, collected after Jumu'ah.", level: "simple" },
      { title: "Promote it", text: "In the newsletter and local neighborhood groups.", level: "simple" },
      { title: "Optional: partner with your regional food bank", text: "Add an indoor pantry with halal options.", level: "complex", entry: "Volunteer team and storage space in place; the food bank's partner-agency requirements reviewed.", exit: "Partner agreement signed, food-safety training done, and first distribution held." },
    ],
    watchouts: [
      "No home-canned goods, expired food, or perishables in the outdoor box. Check labels so non-halal items don't slip in.",
      "Check it often. An empty or messy pantry sends the wrong message.",
    ],
  },

  {
    id: "tool-library",
    title: "Tool & equipment lending library",
    category: "sharing",
    scores: { financial: 2, ease: 3, reach: 3 },
    tagline: "Because most tools are only used a few times.",
    impact: "Members can borrow instead of buy, from drills to the big cooking pots needed for a walima.",
    glance: { cost: "$0 to start (donated items)", costMax: 0, volunteers: "2-3", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "A shared collection of tools and occasional-use equipment that members can borrow for free instead of buying: drills, ladders, lawn tools, folding tables, large cooking pots and chafing dishes for walimas and Eid parties, and extra prayer mats.",
    why: [
      "Most tools and party gear are used only a few times. Borrowing saves members hundreds of dollars a year.",
      "Members can donate items they rarely use, so the collection grows on its own, and it counts as ongoing sadaqah.",
      "It pairs well with the repair café and skills exchange.",
    ],
    examples: [
      {
        name: "Berkeley Tool Lending Library",
        text: "Opened by the Berkeley Public Library in California in 1979, and one of the oldest tool libraries in the U.S.",
        url: "https://www.berkeleypubliclibrary.org/",
      },
      {
        name: "West Philly Tool Library",
        text: "A community-run tool library in Philadelphia that lends thousands of tools to members.",
        url: "https://www.westphillytools.org/about",
      },
      {
        name: "Toronto Tool Library",
        text: "A membership tool library that helped inspire many others across North America.",
        url: "https://en.wikipedia.org/wiki/Toronto_Tool_Library",
      },
    ],
    resources: [
      "Storage space (a closet, shed or basement corner) with shelves and pegboard",
      "Donated tools and equipment to start",
      "A checkout system: a sign-out sheet, a Google Sheet, or tool-library software like myTurn",
      "2-3 volunteers for regular open hours (for example Saturday after Dhuhr)",
      "A borrower agreement and liability waiver",
    ],
    actions: [
      { title: "Run a tool and equipment drive", text: "See what members donate.", level: "simple" },
      { title: "Inventory and label everything", text: "Check that every item is safe and working.", level: "moderate", entry: "Donations collected and storage space set aside.", exit: "Every item labeled, logged and safety-checked; broken items repaired or removed." },
      { title: "Write borrowing rules", text: "Loan length, late policy, damage policy, and a waiver.", level: "simple" },
      { title: "Open with set hours", text: "Announce the catalog in the newsletter.", level: "simple" },
      { title: "Grow the collection", text: "Based on what people ask for.", level: "simple" },
    ],
    watchouts: [
      "Avoid lending dangerous equipment (chainsaws, nail guns) unless borrowers show they know how to use it.",
      "Expect some losses. Keep a small budget for replacements.",
    ],
  },

  {
    id: "community-garden",
    title: "Masjid community garden",
    category: "food",
    scores: { financial: 2, ease: 2, reach: 3 },
    tagline: "Because good food can grow right outside the masjid.",
    impact: "Families can grow fresh vegetables and herbs, and share the extra with the pantry.",
    glance: { cost: "$300-800 for beds and soil", costMax: 800, volunteers: "4-8", launch: "One growing season", launchWeeks: 12 },
    summary:
      "Unused masjid land becomes garden beds where families grow vegetables and herbs for themselves, with part of the harvest given to the masjid pantry or local food banks. Many mosques plant fruit trees too, a classic form of sadaqah jariyah.",
    why: [
      "Fresh produce is one of the most expensive parts of a grocery bill.",
      "It teaches gardening skills families can use at home, and gives kids a hands-on lesson in caring for the earth as khalifah (stewards).",
      "It brings together all ages and is a natural way to meet neighbors.",
    ],
    examples: [
      {
        name: "Green Muslims (Washington, D.C.)",
        text: "A volunteer-run organization that connects Muslims to environmental work through nature outings, education and service, including help for congregations wanting to green their spaces.",
        url: "https://www.greenmuslims.org/",
      },
      {
        name: "Plant a Row for the Hungry",
        text: "Launched in 1995 by the Garden Writers Association (now GardenComm), encouraging gardeners to grow an extra row to donate to food banks.",
        url: "https://gardencomm.org/PAR",
      },
      {
        name: "AmpleHarvest.org",
        text: "Founded in 2009, it helps home and community gardeners find nearby food pantries to donate extra produce to.",
        url: "https://ampleharvest.org/",
      },
    ],
    resources: [
      "A sunny spot (6+ hours of sun) with access to water",
      "Raised-bed materials, soil, compost, seeds and basic tools (or borrow from the tool library)",
      "A garden coordinator and a watering schedule",
      "Help from your local cooperative extension office or Master Gardener program, usually free",
    ],
    actions: [
      { title: "Get approval and choose a site", text: "Check sunlight, water access and soil contamination (a soil test through your extension office is cheap).", level: "moderate", entry: "The masjid board supports the idea.", exit: "Site approved, soil test results back, water source confirmed." },
      { title: "Build beds and plan plots", text: "Shared beds, family plots, or both.", level: "complex", entry: "Site approved, materials and funding (or sponsors) secured, and a build day scheduled.", exit: "Beds built and filled, a watering plan in place, plots assigned." },
      { title: "Plant with help from a Master Gardener", text: "Include herbs and vegetables families cook with.", level: "simple" },
      { title: "Set up a watering and weeding rotation", text: "Especially for summer travel weeks and Hajj season.", level: "simple" },
      { title: "Harvest and donate extras", text: "To the masjid pantry or a food bank.", level: "simple" },
    ],
    watchouts: [
      "Gardens need steady care all season. Plan for weeks when volunteers travel.",
      "Start small, with 3-6 beds, and expand once there's a committed group.",
    ],
  },

  {
    id: "volunteer-rides",
    title: "Volunteer ride program",
    category: "care",
    scores: { financial: 2, ease: 3, reach: 2 },
    tagline: "Because no one should miss Jumu'ah for lack of a ride.",
    impact: "Elders and newcomers can get to prayer, appointments and interviews without paying for rides.",
    glance: { cost: "$0", costMax: 0, volunteers: "5+ drivers", launch: "3-4 weeks", launchWeeks: 4 },
    summary:
      "Volunteer drivers give free rides to members and neighbors who can't drive or don't have a car: elders, people with disabilities, new arrivals, and one-car families. Rides cover Jumu'ah and Eid prayers, medical appointments, grocery trips and job interviews.",
    why: [
      "Saves taxi or rideshare fares and prevents missed medical appointments.",
      "Keeps elders connected to the masjid and to Jumu'ah, which many stop attending once they stop driving.",
      "Most members already drive, so it uses a skill nearly everyone has.",
    ],
    examples: [
      {
        name: "ITNAmerica (Independent Transportation Network)",
        text: "Founded in Portland, Maine, in 1995 by Katherine Freund to provide rides for older adults using volunteer and paid drivers. Its model has been copied by many local ride programs.",
        url: "https://en.wikipedia.org/wiki/ITNAmerica",
      },
      {
        name: "Faith in Action interfaith caregiver programs",
        text: "Networks of congregations that share volunteers to give rides and other help to older neighbors. A masjid can join or start one with nearby congregations.",
      },
      {
        name: "Masjid Jumu'ah ride lists",
        text: "Many mosques keep an informal WhatsApp list of brothers and sisters who pick up elders and newcomers for Jumu'ah. Formalizing it with screening and a coordinator makes it reliable.",
      },
    ],
    resources: [
      "A ride coordinator and a pool of volunteer drivers",
      "A request system: a phone number, a simple form, or a WhatsApp group",
      "Driver requirements: valid license, clean driving record, proof of insurance, and a background check",
      "A short rider and driver agreement",
    ],
    actions: [
      { title: "Ask the masjid's insurer", text: "About coverage for volunteer drivers. Usually the driver's own insurance is primary.", level: "simple" },
      { title: "Recruit and screen drivers", text: "Aim for both brothers and sisters so riders can be matched comfortably.", level: "moderate", entry: "Insurance question answered and driver requirements approved by the board.", exit: "At least 5 drivers have provided license and insurance info, passed a background check, and signed the agreement." },
      { title: "Set up the request process", text: "How far ahead to ask (for example 48 hours), service area and hours.", level: "simple" },
      { title: "Start with elders and Jumu'ah", text: "Then expand to appointments and errands.", level: "simple" },
      { title: "Track rides", text: "To show impact and make sure no driver is overloaded.", level: "simple" },
    ],
    watchouts: [
      "Volunteers should not lift or transfer people who need medical help. Refer them to paratransit.",
      "No driver should be alone with a minor, and match riders and drivers in a way that's comfortable for both.",
    ],
  },

  {
    id: "dads-with-donuts",
    title: "Dads with Donuts",
    category: "family",
    scores: { financial: 1, ease: 5, reach: 4 },
    tagline: "Because kids remember the mornings their dads showed up.",
    impact: "Kids get one-on-one time with their dads, dads meet other dads, and families get a reason to come to the masjid together.",
    glance: { cost: "$50-150 per event (donuts and drinks)", costMax: 150, volunteers: "2-4", launch: "2 weeks", launchWeeks: 2 },
    summary:
      "A monthly Saturday morning for dads and their kids. Pray Fajr together (or start a little later in summer), then share halal donuts, juice and coffee, a ten-minute story from the imam, and a short activity side by side. Grandfathers, uncles and big brothers are just as welcome.",
    why: [
      "Kids who see their dads at the masjid are more likely to feel it's their place too.",
      "Many dads want to be more involved but don't know where to start. A fixed, easy event gives them a reason to show up.",
      "It's one of the cheapest and simplest programs a masjid can run, and it fills the masjid at Fajr.",
    ],
    examples: [
      {
        name: "\"Donuts with Dad\" at Aviano Elementary School",
        text: "A popular school format: dads (or any parent or guardian) and kids share donuts and coffee before school, and kids show their dads around. This U.S. military-base school's PTA ran one to help busy families spend time together.",
        url: "https://avianoes.dodea.edu/news/articles/aviano-elementary-school-hosts-heartwarming-donuts-dad-event",
      },
      {
        name: "All Pro Dad breakfasts",
        text: "A dads-and-kids breakfast held monthly at many U.S. schools, with a short talk on a family topic and time for dads and kids to talk together.",
        url: "https://des.cocalico.org/school__student_activities/clubs_after_school_activities/all_pro_dads_breakfasts",
      },
      {
        name: "Fajr Breakfast at Al Iman Islamic Centre (B.C., Canada)",
        text: "A free Saturday program for adults, students and kids, run with Islamic Relief Canada: Fajr, a short reminder from the sheikh, a confidence-building activity, then breakfast together.",
        url: "https://events.islamicreliefcanada.org/event/fajr-breakfast-al-iman-islamic-centre-i-metro-vancouver-253",
      },
    ],
    resources: [
      "1 organizer and 2-3 helpers to set up, serve and clean up",
      "Halal donuts (check fillings and glazes for gelatin), juice, milk and coffee. A family can sponsor each month as sadaqah.",
      "Tables in the hall, napkins, a trash plan",
      "A simple activity: a craft, a Qur'an story with questions, or a ball game outside",
      "A sign-in sheet and a photo-consent question",
    ],
    actions: [
      { title: "Pick a monthly date and time", text: "For example, the first Saturday of the month: after Fajr in winter, or around 8:30 am in summer when Fajr is very early.", level: "simple" },
      { title: "Line up donuts and a sponsor", text: "Find a bakery with halal-friendly donuts and ask a family or local business to sponsor each month.", level: "simple" },
      { title: "Plan a 45-minute flow", text: "Welcome, a ten-minute story or reminder, a dads-and-kids activity, eat together, group photo.", level: "moderate", entry: "Date set and the imam (or a guest) has agreed to give the short talk.", exit: "A one-page run sheet with times, who does what, and the activity supplies ready." },
      { title: "Invite every father figure", text: "Announce it after Jumu'ah and at weekend school. Say clearly that grandfathers, uncles, big brothers and mentors are welcome.", level: "simple" },
      { title: "Run it and ask two questions", text: "At the end, ask kids what they liked and dads what would bring them back.", level: "simple" },
      { title: "Keep it fresh", text: "Rotate activities: a service project, a sports morning, a Qur'an recitation challenge, or a seasonal theme before Ramadan and Eid.", level: "simple" },
    ],
    watchouts: [
      "Some kids don't have a dad at home. Make uncles, grandfathers and mentors welcome, and pair a volunteer with any child who comes alone.",
      "Kids stay with their own adult the whole time. Ask before posting any photos.",
      "Keep it short and on time. Families come back to events that respect their morning.",
    ],
  },

  {
    id: "moms-kids-chai",
    title: "Moms, kids & chai",
    category: "family",
    scores: { financial: 1, ease: 5, reach: 3 },
    tagline: "Because mothers need a moment for themselves and with their kids.",
    impact: "Mothers can make friends at the masjid, kids get a special outing, and new or isolated mothers get connected.",
    glance: { cost: "$50-150 per event (tea and snacks)", costMax: 150, volunteers: "3-5 sisters", launch: "2-3 weeks", launchWeeks: 3 },
    summary:
      "A relaxed afternoon tea for mothers and their kids in the sisters' space: chai and snacks, a simple craft to make together, and a short, warm talk. It's the sisters' companion to Dads with Donuts, and many mosques run it as a mother-daughter high tea.",
    why: [
      "Mothers of young children are often the most isolated people in a community, and the least likely to have time for themselves.",
      "A friendly, child-welcome event is how many sisters first feel at home in the masjid.",
      "It builds the sisters' network that every other program depends on, from meal trains to the childcare co-op.",
    ],
    examples: [
      {
        name: "\"Chai & Cherish\" mother-daughter high tea at MIA Grand Masjid, Winnipeg",
        text: "Islamic Relief Canada hosted this ladies-only tea at a Winnipeg mosque, with tea, sweet and savoury treats and crafts like making a tasbih, with ticket proceeds going to its orphan sponsorship work.",
        url: "https://www.islamicreliefcanada.org/event/chai-cherish-mother-daughter-high-tea-winnipeg-213",
      },
      {
        name: "Assunnah Muslims Association mother-daughter high tea (Canada)",
        text: "A mosque-run mother-daughter tea listed on the community's events platform.",
        url: "https://events.mymasjid.ca/e/852/mother-daughter-high-tea",
      },
    ],
    resources: [
      "A lead sister and 2-4 helpers",
      "The sisters' hall or a classroom, with a corner for toddlers",
      "Chai, coffee and snacks (sponsor-funded or a small ticket that covers costs or raises sadaqah)",
      "A craft: painting a pot, decorating a du'a card, or making a tasbih",
      "A short talk from a respected sister or a guest speaker",
    ],
    actions: [
      { title: "Choose a format and date", text: "Monthly or quarterly. Weekend afternoons work well. Decide if it's for all kids or a mother-daughter special.", level: "simple" },
      { title: "Plan the program", text: "Arrival and chai, a craft together, a 10-minute talk, then free time to chat.", level: "moderate", entry: "Date and room confirmed with the masjid board.", exit: "A run sheet, a supply list and a speaker confirmed." },
      { title: "Invite personally", text: "Ask every sister on the committee to personally invite two mothers who rarely come to the masjid.", level: "simple" },
      { title: "Run it", text: "Greet everyone at the door by name and introduce newcomers to two people.", level: "simple" },
      { title: "Keep the connections going", text: "Start a sisters' WhatsApp group from the sign-in sheet (with permission) and share the next date.", level: "simple" },
    ],
    watchouts: [
      "Keep the space private and comfortable for sisters, and ask before any photos.",
      "Plan for babies and toddlers: a play mat, a helper and no hot drinks near little hands.",
    ],
  },

  {
    id: "family-game-night",
    title: "Family game night",
    category: "family",
    scores: { financial: 1, ease: 5, reach: 4 },
    tagline: "Because families that play together stay close.",
    impact: "Families can have a free night out together and get to know other families in the masjid.",
    glance: { cost: "Under $100 (games are often donated)", costMax: 100, volunteers: "2-4", launch: "2 weeks", launchWeeks: 2 },
    summary:
      "A monthly evening after Maghrib or Isha where families play board games, card games and quiz games together in the hall, with simple snacks. Add an Islamic trivia round, a kids' corner and a table where elders teach a classic game.",
    why: [
      "It gives families a screen-free night out that costs nothing.",
      "Games break the ice between families who pray side by side but have never talked.",
      "Teens, parents and grandparents can all play, which is rare for a masjid event.",
    ],
    examples: [
      {
        name: "Banbury Madni Masjid family games night (UK)",
        text: "A regular Saturday evening of board games and activities run by the masjid and its education centre, with a small £1 entry.",
        url: "https://banburymadnimasjid.com/resources/events/family-games-night/",
      },
      {
        name: "Assunnah Muslims Association game night (Canada)",
        text: "A mosque game night listed on the community's events platform.",
        url: "https://events.mymasjid.ca/e/931/game-night",
      },
    ],
    resources: [
      "A collection of board games and card games (ask families to donate or lend)",
      "Tables and chairs in the hall",
      "Snacks and drinks",
      "A volunteer host for an Islamic trivia round",
    ],
    actions: [
      { title: "Collect games", text: "Ask after Jumu'ah for donated games. Label them as masjid property.", level: "simple" },
      { title: "Pick a monthly night", text: "Fridays or Saturdays after Maghrib or Isha usually work best.", level: "simple" },
      { title: "Plan the evening", text: "Open play, a 20-minute all-ages trivia round, and a cleanup game at the end.", level: "moderate", entry: "Games collected and date booked.", exit: "Tables planned by age group, trivia questions written, and snack sponsor confirmed." },
      { title: "Run it and invite neighbors", text: "Once it's running well, invite neighbors and other congregations.", level: "simple" },
    ],
    watchouts: [
      "Choose games that fit the masjid's values (no gambling-style play).",
      "Plan supervision for younger kids, so parents can actually play.",
    ],
  },

  {
    id: "youth-sports-night",
    title: "Youth sports night",
    category: "family",
    scores: { financial: 1, ease: 3, reach: 3 },
    tagline: "Because young people should never have to choose between their team and their prayer.",
    impact: "Teens can play sports in a setting where prayer is built in and coaches are role models, which keeps them connected to the masjid.",
    glance: { cost: "$0-500 (depends on gym rental)", costMax: 500, volunteers: "3-6 coaches", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "A weekly basketball, soccer or volleyball night for youth at the masjid's gym or a rented court, with a prayer break built in and a short talk from a coach or youth leader. It can grow into a league with other mosques.",
    why: [
      "Sports are where many young people spend their evenings. Running them through the masjid keeps teens close to the community.",
      "Young players can pray without feeling awkward about stepping away from practice.",
      "Coaches and older players become mentors for younger ones.",
    ],
    examples: [
      {
        name: "iDrive Faith and Athletics (Chicago area)",
        text: "A Muslim youth basketball league for 1st to 12th graders, started in 2022 by two founders who met through an Islamic center. It grew out of a skills camp and is open to non-Muslims too.",
        url: "https://depauliaonline.com/77220/sports/basketball-league-helps-young-muslim-players-merge-faith-and-sports-and-find-community/",
      },
      {
        name: "Ottawa Muslim Summer League",
        text: "A community summer sports league listed by the Assunnah Muslims Association in Ottawa.",
        url: "https://events.mymasjid.ca/e/710/ottawa-muslim-summer-league",
      },
    ],
    resources: [
      "A gym, court or field (the masjid's own, a school's, or a rented city court)",
      "Balls, cones and pinnies",
      "3-6 coaches and adult supervisors, background-checked",
      "A first-aid kit and a parent consent form",
    ],
    actions: [
      { title: "Find a space and a night", text: "Ask local schools and city recreation centers about weekly court time.", level: "simple" },
      { title: "Recruit and screen coaches", text: "Look for young adults who play and can be good role models.", level: "moderate", entry: "Space confirmed and the masjid's child-safety policy reviewed.", exit: "At least 3 coaches background-checked, briefed and scheduled." },
      { title: "Set the format", text: "Warm-up, drills, games, a prayer break at the right time, and a 5-minute talk.", level: "simple" },
      { title: "Register players", text: "Collect consent forms, emergency contacts and any health notes.", level: "moderate", entry: "Coaches in place and a registration form ready.", exit: "Signed forms for every player and a contact list for parents." },
      { title: "Grow into a league", text: "Invite nearby mosques for friendly games, then a season.", level: "complex", entry: "At least one full season run safely with steady attendance.", exit: "Two or more mosques agree on a schedule, rules and shared referees." },
    ],
    watchouts: [
      "Follow your child-safety policy: two adults present, and kids leave only with authorized adults.",
      "Check insurance for sports on masjid property or rented space.",
      "Keep it welcoming to beginners, not just the best players.",
    ],
  },

  {
    id: "open-mosque-day",
    title: "Open mosque day",
    category: "care",
    scores: { financial: 1, ease: 4, reach: 3 },
    tagline: "Because neighbors who visit become friends.",
    impact: "Neighbors can see the masjid for themselves, ask questions over tea, and find out how to join its programs.",
    glance: { cost: "Under $200 (tea, snacks, printed guides)", costMax: 200, volunteers: "6-12", launch: "4-6 weeks", launchWeeks: 6 },
    summary:
      "Once or twice a year, the masjid opens its doors to neighbors: guided tours, tea and sweets, a chance to watch a prayer, and a table for every community program they can join. It works well alongside a food drive or blood drive.",
    why: [
      "Most people have never been inside a mosque. A friendly visit replaces assumptions with real faces.",
      "It recruits volunteers and partners for every other program on this site.",
      "Local officials, police, schools and faith leaders get to know the masjid before they ever need to.",
    ],
    examples: [
      {
        name: "Visit My Mosque (UK)",
        text: "A national open day facilitated by the Muslim Council of Britain since 2015, when about 20 mosques took part. By 2018 more than 200 mosques were opening their doors on the same day, often adding food collections and blood drives.",
        url: "https://en.wikipedia.org/wiki/Visit_My_Mosque",
      },
    ],
    resources: [
      "6-12 friendly volunteers as greeters and tour guides, both brothers and sisters",
      "Tea, coffee and sweets",
      "Printed one-page guide: what a mosque is, what happens in prayer, how to join our programs",
      "Signs, name tags and a guest book",
      "Spare headscarves for visitors who'd like one (optional, never required)",
    ],
    actions: [
      { title: "Pick a date and get the board's support", text: "Weekend afternoons work well. Avoid Jumu'ah and Ramadan nights.", level: "simple" },
      { title: "Train tour guides", text: "A one-hour session: a simple route, common questions and how to answer warmly.", level: "moderate", entry: "Date set and at least 6 volunteers signed up.", exit: "Every guide has walked the route once and has the one-page guide." },
      { title: "Invite neighbors", text: "Flyers to nearby houses, local schools, churches and synagogues, city council and police community officers.", level: "simple" },
      { title: "Run the day", text: "Greet at the door, offer tea, run tours every 30 minutes, and staff a programs table.", level: "simple" },
      { title: "Follow up", text: "Email or text guests who left contact details and invite them to the next community event.", level: "simple" },
    ],
    watchouts: [
      "Be welcoming, not preachy. Answer questions; don't pressure anyone.",
      "Agree in advance who speaks to any media or local officials.",
    ],
  },

  {
    id: "family-nature-walks",
    title: "Family nature walks",
    category: "family",
    scores: { financial: 1, ease: 4, reach: 3 },
    tagline: "Because reflecting on creation is part of faith.",
    impact: "Families can get outdoors together for free, learn about caring for the earth, and make friends along the way.",
    glance: { cost: "$0", costMax: 0, volunteers: "2-4", launch: "2-3 weeks", launchWeeks: 3 },
    summary:
      "A monthly family walk at a local park or trail: pray together outdoors, take a short reflection on a verse about creation, and finish with a picnic. Add a litter pick or a tree planting a few times a year as a service project.",
    why: [
      "It's free, healthy and easy for families with kids of all ages.",
      "The Qur'an repeatedly invites us to reflect on creation, and kids learn that caring for the earth is part of being Muslim.",
      "It's a relaxed way for new families and reverts to join in.",
    ],
    examples: [
      {
        name: "Green Muslims (Washington, D.C.)",
        text: "A volunteer group that connects faith and nature through hikes, service days and Our Deen is Green, an interfaith summer program that takes kids of different faiths outdoors together.",
        url: "https://chesapeakebaymagazine.com/green-muslims-group-puts-faith-in-bay-restoration/",
      },
    ],
    resources: [
      "A walk leader who knows a few easy, stroller-friendly trails",
      "A first-aid kit and a list of emergency contacts",
      "A short reflection (a verse or hadith about nature) and a prayer mat or two",
      "Trash bags and gloves for a litter pick",
    ],
    actions: [
      { title: "Choose 3-4 easy trails", text: "Short, safe and close by, with restrooms and parking.", level: "simple" },
      { title: "Set a monthly date", text: "Weekend mornings or late afternoons, timed so you can pray Dhuhr or Asr outdoors together.", level: "simple" },
      { title: "Plan the first walk", text: "Meeting point, route, reflection, prayer spot and picnic area.", level: "moderate", entry: "Trail chosen and a walk leader confirmed.", exit: "A route plan shared with families, plus a first-aid kit and a headcount process." },
      { title: "Add a service day", text: "Partner with your local parks department for a litter pick or tree planting.", level: "simple" },
    ],
    watchouts: [
      "Check the weather and the trail. Keep a headcount at the start and end.",
      "Kids stay with their own adults. Bring water and sun protection.",
    ],
  },
];
