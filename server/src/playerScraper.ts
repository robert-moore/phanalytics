import axios from 'axios';
import cheerio from 'cheerio';

const dataUrl = 'https://questionnaire-148920.appspot.com/swe/data.html';

interface IPlayer {
  name: string;
  firstName: string;
  lastName: string;
  salary: number | null;
  year: number;
  level: string;
}

function cleanSalary(raw: string): number | null {
  if (!raw) {
    return null;
  }
  const digits = raw.replace(/[^0-9]+/g, '');
  if (digits.length) {
    return parseInt(digits, 10);
  }
  return null;
}

export const fetchPlayers = async (): Promise<IPlayer[]> => {
  try {
    const response = await axios.get(dataUrl);
    const $ = cheerio.load(response.data);
    const rows = $('table#salaries-table tbody tr');

    const rawData = [];
    const players = [];
    rows.each((i, elem) => {
      rawData.push($(elem));
      const name = $(elem).find('td.player-name').text();
      const salary = cleanSalary($(elem).find('td.player-salary').text());
      const year = parseInt($(elem).find('td.player-year').text(), 10);
      const level = $(elem).find('td.player-level').text();
      const [lastName, firstName] = name.split(',');
      players.push({
        name,
        salary,
        year,
        level,
        firstName,
        lastName,
      });
    });
    return players;
  } catch (e) {
    console.log(e);
    return null;
  }
};
