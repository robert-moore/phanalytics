import { fetchPlayers } from './playerScraper';

export async function main(event, context, callback) {
  try {
    const players = await fetchPlayers();
    // sort players according to salary
    const sortedBySalary = players.sort((a, b) => {
      if (!a.salary) {
        return 1;
      }
      if (!b.salary) {
        return -1;
      }
      return b.salary - a.salary;
    });
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(sortedBySalary),
    };
    callback(null, response);
  } catch (e) {
    console.log(e);
    callback(e);
  }
}
