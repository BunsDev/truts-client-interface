import sampleImages from './sampleImages'
import axios from 'axios';

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
        discord_link: "example.com",
        twitter_link: "example.com",
        website_link: "example.com",
        verified_status: false,
        additional_link: "",
        additional_details: "",
        mirror_link: "",
        guild_id: "919638313512611840",
    }

    let category = ['social', 'investment', 'service', 'protocol', 'NFT', 'marketplace'];



    let names = [
        "BeetsDAO",
        "BitDAO",
        "LexDAO",
        "MakerDAO",
        "Mirror",
        "PleasrDAO",
        "RaidGuild",
        "Uniswap DAO",
        "Uniswap",
        "Aragon",
        "Curve DAO",
        "Aave",
        "Decred",
        "Steem",
        "Dash",
        "The DAO",
        "sandsDAO",
        "PopDAO",
        "SwatDAO",
        "calvinistDAO"
    ]

    for (let i = 0; i < names.length; i++) {


        console.log(i + "entry");
        dataObj.dao_name = names[i];
        dataObj.dao_cover = sampleImages[i];
        dataObj.dao_logo = sampleImages[i];
        dataObj.dao_category = [category[Math.floor(Math.random() * 6)], category[Math.floor(Math.random() * 6)], category[Math.floor(Math.random() * 6)]];
        dataObj.average_rating = 4;
        dataObj.slug = names[i].toLocaleLowerCase().replace(' ', '_')

        let url = `${process.env.API}/dao/create-new-dao`
        let res = await axios.post(url, { ...dataObj });
        console.log(res.status);
    }
}

export default submitSampleData;