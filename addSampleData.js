import sampleImages from './sampleImage'
import axios from 'axios';

let sampleData = [
    {
        "dao_name": "APE DAO",
        "dao_mission": "The APE DAO began by fractionalizing (token partitioning) 50 valued NFTs into APED erc-20 tokens, which provide holders with governance over their NFTs. General governance is now token-based, with a shift toward community rule on the horizon.",
        "description": "The APE DAO began by fractionalizing (token partitioning) 50 valued NFTs into APED erc-20 tokens, which provide holders with governance over their NFTs. General governance is now token-based, with a shift toward community rule on the horizon.",
        "dao_category": [
            "Collector"
        ]
    },
    {
        "dao_name": "APECOIN DAO",
        "dao_mission": "ApeCoin is an ERC-20 governance and utility token designed to support the development of a decentralised community at the cutting edge of web3.",
        "description": "ApeCoin is an ERC-20 governance and utility token designed to support a decentralised community at the cutting edge of web3.",
        "dao_category": [
            "Art",
            "Community",
            "Social"
        ]
    },
    {
        "dao_name": "AladdinDAO",
        "dao_mission": "Farm with DeFi Big Brains http://aladdin.club",
        "description": "Farm with DeFi Big Brains http://aladdin.club",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": "AngelDAO",
        "dao_mission": "Distributed systems investment collective VentureDAO",
        "description": "AngelDAO is a Venture Decentralized Autonomous Organization supporting a wide variety of projects with funding, software development, network participation and community building. Our team is native in the blockchain space, with experience in token model creation, Web3 software development, DeFi, UI/UX development and design, marketing, and community organization.",
        "dao_category": [
            "Investment",
            "Service",
            "Protocol"
        ]
    },
    {
        "dao_name": "Antidote DAO",
        "dao_mission": "AntidoteDAO is a non-profit Web3 DAO dedicated to funding cancer research.",
        "description": "Companies are extremely centralised in traditional business structures, and investors have little input in the destiny of those organisations. Typical charities have large administrative fees and don't let you choose what your money goes to. Investors will have equal governance in how Antidote operates and what we fund as we transition to a DAO (Decentralized Autonomous Organization) framework. We'll start with a more centralised structure and gradually decentralise as time goes on. DAOs aren't just businesses; they're also communities. Blockchain technology allows for a higher level of collaboration and communication. In the field of cancer research, we have the potential to be more successful and have a greater impact than any typical charity. Our purpose isn't to support other NGOs, but to strategically locate them in order to raise awareness of what we're doing. Our ultimate goal is to provide seed funding for new research that does not have access to other sources of funding.",
        "dao_category": [
            "Social",
            "Community"
        ]
    },
    {
        "dao_name": "AfrofutureDAO",
        "dao_mission": "Unlocking the value of Africa's history in Web3",
        "description": "AfrofutureDAO is a DAO on a mission to invest in the next generation of Africans by unlocking the value of Africa's historical and cultural assets.",
        "dao_category": [
            "Club",
            "Media"
        ]
    },
    {
        "dao_name": "AlchemistDAO",
        "dao_mission": "",
        "description": "AlchemistDAO is a fork of the Alchemist Program that brings together a community of innovative data-nerds within the Covalent network, tearing down barriers and ushering in a new data-driven economy.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": "AlunaDAO",
        "dao_mission": "",
        "description": "Users can link and manage numerous exchange accounts in one location, verify and share their trading performance in a secure manner, benefit from community insights and positive social feedback loops, and automatically imitate the moves of the world's greatest traders (or counter-copy the worst!)",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": "Analyst DAO",
        "dao_mission": "Distributed Equity Research",
        "description": "AnalystDAO is a distributed digital asset research DAO built with the goal of bringing together a group of new DeFi, Web3, and NFT analysts to generate high-quality research and curate a community.",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": " AnubisDAO ",
        "dao_mission": "",
        "description": "A one-of-a-kind protocol based on KCC that includes a dynamic buyback as well as a dynamic sell tax, both of which are based on slippage.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": " API3 DAO ",
        "dao_mission": "The Web3 API Economy",
        "description": "API3 is a collaborative project aimed at providing traditional API services to smart contract platforms in a decentralised and trust-free manner. A DAO, the API3 DAO, is in charge of it. As a result, its code is available for download and its activities are transparent.",
        "dao_category": [
            "Protocols"
        ]
    },
    {
        "dao_name": " Astra DAO ",
        "dao_mission": "DAO displaying some great artworks in NFT",
        "description": "",
        "dao_category": [
            "Social",
            "Art"
        ]
    },
    {
        "dao_name": " Astro DAO ",
        "dao_mission": "DAO Platform for Sputnik Smart Contracts on NEAR Protocol to Create DAOs",
        "description": "",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": "BaconDAO",
        "dao_mission": "",
        "description": "We are a collective of intellectuals and investors at the grassroots level. In the Crypto realm, we are assisting one other in learning and profiting. | http://BaconDAO.com | https://t.me/baconDAO",
        "dao_category": [
            "Community",
            "Education",
            "Investment"
        ]
    },
    {
        "dao_name": "BasketDAO",
        "dao_mission": "Diversified High-Yield Savings Account from DeFi",
        "description": "",
        "dao_category": [
            "Investment"
        ]
    },
    {
        "dao_name": "BeetsDao",
        "dao_mission": "",
        "description": "The EulerBeats group first formed a private, global NFT collective among 58 collaborators who met on a Discord channel and had a passion for the long-term power of NFTs.",
        "dao_category": [
            "Social",
            "Art",
            "Collector"
        ]
    },
    {
        "dao_name": "BitDao",
        "dao_mission": "Supporting open finance and a tokenized economy that is decentralised",
        "description": "BitDAO wants to leverage its financial and human capital to promote and invest in DeFi innovation, collaboration, and growth.",
        "dao_category": [
            "Protocols"
        ]
    },
    {
        "dao_name": " BadgerDAO ",
        "dao_mission": "Bringing Bitcoin to a DeFi Environment",
        "description": "We're working on products that will make it easier for you to transfer your Bitcoin to DeFi and start earning yield right away. Our Core Values Earning yields that are typically much higher than those found in traditional finance. Keeping control of your private keys so you can maintain complete control over your assets",
        "dao_category": [
            "Protocols"
        ]
    },
    {
        "dao_name": " Bankless DAO ",
        "dao_mission": "Assist the world in becoming bankless.",
        "description": "Bankless DAO is a decentralised community centred on the Bankless blockchain platform. Through media, culture, and education, it promotes the adoption and awareness of bankless money systems such as Ethereum, Bitcoin, and DeFi.",
        "dao_category": [
            "Media",
            "Education",
            "Community"
        ]
    },
    {
        "dao_name": " Big Green DAO ",
        "dao_mission": "Grant-making is being radically reformed.",
        "description": "Big Green is a 501(c)(3) non-profit organisation based in the United States. We've been educating people how to grow food since 2011. Across the country, we're assisting schools, communities, and families. Now we are testing�with the DAO notion.",
        "dao_category": [
            "Grants",
            "Social"
        ]
    },
    {
        "dao_name": " Black DAO ",
        "dao_mission": "A Pan-African Multi-Chain Fund",
        "description": "For the digital era, Black DAO is creating a Pan-African multi-chain reserve currency. Black and African-owned enterprises, creatives, and initiatives are supported by the community.",
        "dao_category": [
            "Grants",
            "Social"
        ]
    },
    {
        "dao_name": " BoringDAO ",
        "dao_mission": "Decentralized asset's bridge access to all blockchains",
        "description": "We are building Decentralized Tunnels between blockchains for your crypto assets",
        "dao_category": [
            "Service",
            "Protocols"
        ]
    },
    {
        "dao_name": "BLOCKS DAO",
        "dao_mission": "Getting businesses on chain with help of our utility token for transferring data and verifying digital assets.",
        "description": "BLOCKS is dedicated to bringing businesses from all industries onto the blockchain and growing the utility of its digital asset to the point where it can be used as a unit of measure for blockchain. No leading member has majority rule in the world's first legally recognised DAO LLC, and decentralised governance is based on digital assets and an operational agreement. We invite like-minded people, organisations, and network members to join us in our mission.",
        "dao_category": [
            "Service",
            "Protocols"
        ]
    },
    {
        "dao_name": "Bunker DAO",
        "dao_mission": "",
        "description": "We hope to be able to provide you with a bunker in your country. The contributors own everything. Ex-military founded the company.",
        "dao_category": [
            "Investment",
            "Service",
            "Social"
        ]
    },
    {
        "dao_name": "CRE8RDAO",
        "dao_mission": "The Content Marketing Agency of DeFi",
        "description": "As a content creator, project manager, or developer, you can join the team. Or learn how we use DeFi protocols to plan and execute content marketing campaigns.",
        "dao_category": [
            "Media"
        ]
    },
    {
        "dao_name": "CabinDao",
        "dao_mission": "Decentralized city for independent creators",
        "description": "Cabin is now a place where you can meet up with your online friends in person. Our ambition is for it to become one node in a network of decentralised properties run by small groups of autonomous online creators and businesses in the future.",
        "dao_category": [
            "Media",
            "Social"
        ]
    },
    {
        "dao_name": "Canu DAO",
        "dao_mission": "Community and automation for DAOs and Web3 business",
        "description": "",
        "dao_category": [
            "Community",
            "Social"
        ]
    },
    {
        "dao_name": "CatalanDAO",
        "dao_mission": "",
        "description": "CatalanDAO is a collaborative effort to build the world's first Digital Nation DAO, where anyone, catalan or not, can participate as a digital citizen or supporter.",
        "dao_category": [
            "Community",
            "Social"
        ]
    },
    {
        "dao_name": "CityDAO",
        "dao_mission": "",
        "description": "Creating a city on the Ethereum blockchain, beginning with a community property purchase in Wyoming under the new Wyoming DAO LLC law.",
        "dao_category": [
            "Community",
            "Social"
        ]
    },
    {
        "dao_name": "CrisisDAO",
        "dao_mission": "Let's make the world better-ish.",
        "description": "DAO supporting NFT collections",
        "dao_category": [
            "collector"
        ]
    },
    {
        "dao_name": " CapsuleDao ",
        "dao_mission": "A sci-fi MMORPG with on-chain loot.",
        "description": "",
        "dao_category": [
            "Social",
            "Sports"
        ]
    },
    {
        "dao_name": "CarbonDAO",
        "dao_mission": "",
        "description": "A DAO dedicated to the environment is embedding carbon offsets into smart contracts.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": " CarewDAO ",
        "dao_mission": "We're attempting to purchase a skyscraper.",
        "description": "We're trying very hard to acquire the Carew Tower in Cincinnati, Ohio. As a DAO, we want to renovate, repurpose, and administer the tower.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": " Cedge DAO ",
        "dao_mission": "Create Magic",
        "description": "",
        "dao_category": [
            "Community"
        ]
    },
    {
        "dao_name": " Citizen DAO ",
        "dao_mission": "",
        "description": "Social impacts DAO is a decentralised autonomous organisation (DAO) for coordinating ideas, people, and crypto to address humanity's most pressing issues.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": " Closer DAO ",
        "dao_mission": "The land stewardship community's operating system",
        "description": "",
        "dao_category": [
            "Social",
            "Service"
        ]
    },
    {
        "dao_name": " Club Penguin DAO ",
        "dao_mission": "Club Penguin is being modernised.",
        "description": "We're working to buy Club Penguin's rights with tokens, NFTs, and crypto, modernise it for the Metaverse, and present the platform to a new generation.",
        "dao_category": [
            "Community",
            "Media"
        ]
    },
    {
        "dao_name": " Coffee DAO ",
        "dao_mission": "NFTs contributed by the community in a vault",
        "description": "Coffee DAO is a group of $ALGO NFT fans whose primary goal is to improve the quality of the Algorand NFT market. Coffee DAO members have generously given a number of uncommon NFTs to the Coffee Vault.",
        "dao_category": [
            "Collector",
            "Community"
        ]
    },
    {
        "dao_name": "Constitution DAO",
        "dao_mission": "A DAO that collected $40 million to purchase the US Constitution",
        "description": "Constitution DAO was a non-profit organisation founded in November 2021 with the objective of acquiring the United States Constitution and returning it to the people.�The DAO garnered $40 million in three days, but Ken Griffin, the creator of Citadel, won the auction.",
        "dao_category": [
            "Social"
        ]
    },
    {
        "dao_name": "Curve DAO",
        "dao_mission": "Using sophisticated bonding curves to create deep on-chain liquidity",
        "description": "Curve DAO is the Curve Protocol's DAO in charge of protocol governance and value accrual. Curve's major purpose is to allow users and other decentralised protocols to convert stablecoins (for example, DAI to USDC) with minimal fees and low slippage through it. Curve's activity differs from that of other exchanges that connect buyers and sellers; it leverages liquidity pools like Uniswap. Curve requires liquidity (tokens) to accomplish this, and those who offer it are rewarded. The Curve developers do not have access to your tokens because they are non-custodial. The Curve DAO token's major goals are to incentivize liquidity providers on the Curve Finance platform and to involve as many users as possible in the protocol's governance. The Curve DAO uses a token ($CRV) for both governance and value accrual. $CRV is currently used for three purposes: voting, staking, and boosting. These three activities will need locking your $CRV and obtaining $veCRV.",
        "dao_category": [
            "Protocols"
        ]
    },
    {
        "dao_name": "DAOHaus",
        "dao_mission": "Magic Internet Communities for All",
        "description": "DAOhaus is a platform for launching and running DAOs that doesn't require any coding. It is a community-owned and operated facility. Moloch's magnificent open-source code is used by all DAOs on the platform.",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": "DAOSquare",
        "dao_mission": "",
        "description": "The Web3 Incubator is a place where you may try out new ideas. The explosion of DeFi and NFT is only the start of a wave of major Web3 advancements. Web3's big boom is approaching.",
        "dao_category": [
            "Investment",
            "Grants",
            "Community"
        ]
    },
    {
        "dao_name": "DXDao",
        "dao_mission": "Introducing Decentralization to DeFi",
        "description": "DXdao is a highly scalable decentralised autonomous organisation focusing on building and administering protocols and dApps in the DeFi ecosystem, which was founded in May of 2019.",
        "dao_category": [
            "DeFi"
        ]
    },
    {
        "dao_name": "DaoStack",
        "dao_mission": "",
        "description": "Built on the Ethereum blockchain, DAOstack is a comprehensive operating system for decentralised coordination. http://daostack.io",
        "dao_category": [
            "DAO tools"
        ]
    },
    {
        "dao_name": "DarkstarDAO",
        "dao_mission": "If you're off the bus in the first place � then it won't make a damn",
        "description": "DAO about the web3 industry news",
        "dao_category": [
            "Media",
            "Social"
        ]
    },
    {
        "dao_name": "DeepDao",
        "dao_mission": "Making sense of DAOs",
        "description": "It is a site for decentralised autonomous organisations' data analytics. DeepDAO provides extensive dynamic dashboards of assets, membership, and involvement for DAOs. Holders and members of DAO tokens get a comprehensive view of their organisations, actions, and linked people across all listed DAOs.",
        "dao_category": [
            "DAO tools",
            "Service"
        ]
    },
    {
        "dao_name": "Diamond DAO",
        "dao_mission": "",
        "description": "Coordination of data and analytics design, development, and distribution for DAOs, DeFi protocols, gaming, social tokens, prediction markets, and other projects.",
        "dao_category": [
            "DAO tools"
        ]
    },
    {
        "dao_name": "Divine DAO",
        "dao_mission": "",
        "description": "DivineDAO is being constructed because we feel the LOOT ecosystem requires infrastructure and a community structured around more effective, targeted decision-making while simultaneously respecting decentralisation and accessibility ideologies.",
        "dao_category": [
            "Media",
            "Community",
            "games"
        ]
    },
    {
        "dao_name": "DtravelDAO",
        "dao_mission": "The world's first home sharing economy designed by and for people.",
        "description": "Dtravel is a decentralised autonomous organisation that is community owned and administered by the platform's users. By hosting or hiring a house, you gain direct influence over Dtravel's policies, vision, and direction.",
        "dao_category": [
            "Social",
            "Service"
        ]
    },
    {
        "dao_name": "DuckDAO Incubator",
        "dao_mission": "Incubator for digital assets",
        "description": "DuckDAO is the world's largest crosschain crypto project incubator. https://t.me/duckdaolobby",
        "dao_category": [
            "Investment",
            "Social"
        ]
    },
    {
        "dao_name": "DAO Masters",
        "dao_mission": "Discover the resources available to help you start, maintain, and grow a DAO.",
        "description": "DAO Masters is a content and resource platform for learning about all aspects of DAOs. There's intriguing stuff for everyone, whether you're brand new to DAOs or want to brush up on what you already know.",
        "dao_category": [
            "Media",
            "Service",
            "Education"
        ]
    },
    {
        "dao_name": "DAppNodeDAO ",
        "dao_mission": "",
        "description": "An operating system and hardware for decentralisation, simplifying the hosting of nodes and DApps.",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": " DELTA DAO ",
        "dao_mission": "",
        "description": "DELTA DAO is a crypto asset management platform built on the Binance Smart Chain and Polygon blockchains.",
        "dao_category": [
            "Defi",
            "Service"
        ]
    },
    {
        "dao_name": " DopeDAO ",
        "dao_mission": "",
        "description": "Inspired by the famous TI-83 game we used to play instead of doing math homework, the DOPE WARS community is creating one of the first play-to-earn crypto games on the Ethereum and StarkWare blockchains.",
        "dao_category": [
            "P2E",
            "Community"
        ]
    },
    {
        "dao_name": "Developer DAO",
        "dao_mission": "Accelerating education and impact of new wave web3 builders",
        "description": "Through our membership programme, we onboard, educate, and support Web3 developers. Dedicated to the development and promotion of Web3 tools and public goods for the benefit of the whole Web3 community.",
        "dao_category": [
            "Service",
            "Social",
            "Education"
        ]
    },
    {
        "dao_name": "Dream Dao",
        "dao_mission": "Empowering Gen Z",
        "description": "The Dream DAO's aim is to invest in the development of the web3 x social impact ecosystem by giving Gen Zers with the training, money, and community they need to harness web3's power to ensure humanity's brighter future.",
        "dao_category": [
            "Investment",
            "Social"
        ]
    },
    {
        "dao_name": "EnterDAO",
        "dao_mission": "Building a gateway to the metaverse",
        "description": "EnterDAO is a DAO building products to enable new markets within the Web3 metaverse economy. The goal is to empower users, metaverse land owners, investors, brands and degens of all kinds by tackling pain points like access to metaverse land, its capital efficiency, UX, and onboarding.",
        "dao_category": [
            "Service"
        ]
    },
    {
        "dao_name": " EventDAO ",
        "dao_mission": "Events and concerts decentralized",
        "description": "EventDAO is a decentralised platform that hosts the world's major events and concerts and distributes earnings to the community.",
        "dao_category": [
            "Social",
            "Media"
        ]
    },
    {
        "dao_name": "Elf DAO",
        "dao_mission": "The first-ever Web3 toy drive.",
        "description": "We're all elves�the toilers, builders, and givers of festive joy. We're going to buy gifts for underserved youngsters as a group.",
        "dao_category": [
            "Community"
        ]
    },
    {
        "dao_name": "ENS DAO",
        "dao_mission": "A DAO that governs the Ethereum Name Service protocol.",
        "description": "The Ethereum Name Service (ENS) is a blockchain-based distributed, open, and extendable naming system. Our objective is to use self-sovereign identities to enable web3 users to communicate effortlessly with people, organisations, and smart contracts. This is accomplished by mapping human-readable names, such as alice.eth, to machine-readable identifiers, such as Ethereum addresses, other cryptocurrency addresses, content hashes, and metadata.",
        "dao_category": [
            "Protocol"
        ]
    }
];



const submitSampleData = async () => {

    let dataObj = {
        dao_name: "",
        dao_category: "",
        dao_mission: "",
        description: "",
        slug: "",
        average_rating: "",
        dao_cover: "",
        dao_logo: "",
        discord_link: "https://discord.gg/Nkp68AS8PU",
        twitter_link: "https://twitter.com/Twitter",
        website_link: "http://example.com/",
        verified_status: false,
        additional_link: "",
        additional_details: "",
        mirror_link: "",
        guild_id: "919638313512611840",
    }

    let category = ['social', 'investment', 'service', 'protocol', 'NFT', 'marketplace'];

   

    for (let i = 0; i < sampleData.length; i++) {
        let image = sampleImages[Math.floor(Math.random() * 4)];
        console.log(i + "entry");
        dataObj.dao_name = sampleData[i].dao_name;
        dataObj.dao_cover = image;
        dataObj.dao_logo = image;
        dataObj.dao_category = sampleData[i].dao_category;
        dataObj.average_rating = 4;
        dataObj.dao_mission = sampleData[i].dao_mission;
        dataObj.dao_mission = sampleData[i].dao_mission;
        let url = `${process.env.API}/dao/create-new-dao`
        let res = await axios.post(url, { ...dataObj });
        console.log(res.status);
    }
}

export default submitSampleData;