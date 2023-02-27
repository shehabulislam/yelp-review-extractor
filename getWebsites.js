import axios from "axios";
import cheerio from "cheerio";

const getWebsites = async () => {
  const { data: html } = await axios.get("https://whatcms.org/");

  const data = [];
  const $ = cheerio.load(html);
  $(".table tbody tr").each((i, element) => {
    const isWordPress = $(element).find("td:nth-child(2)").text()?.includes("WordPress");
    if (isWordPress) {
      const website = $(element).find("td:nth-child(1)").html();
      data.push(website);
    }
  });
  return data;
};

export default getWebsites;
